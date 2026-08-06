import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

import PrizeStructureEditor from "../components/PrizeStructureEditor";
import BlindStructureEditor from "../components/BlindStructureEditor";
import ImageUploader from "../components/ImageUploader";
import PokerTournamentForm from "../components/PokerTournamentForm";

import { formatDateTimeToApi } from "../utils/dateFormatToApi";



function convertPrizeToEditor(data) {

  return Object.entries(data || {}).map(
    ([rank, amount]) => {

      if(rank.includes("-")) {

        const [
          start,
          end
        ] = rank.split("-");


        return {

          startRank:
            Number(start),

          endRank:
            Number(end),

          amount:
            String(amount),

        };

      }



      return {

        startRank:
          Number(rank),

        endRank:
          Number(rank),

        amount:
          String(amount),

      };

    }
  );

}




function TournamentEditPage() {


  const {
    id
  } = useParams();



  const navigate =
    useNavigate();



  const [loading,setLoading] =
    useState(true);




  const [title,setTitle] =
    useState("");



  const [description,setDescription] =
    useState("");



  const [gameType,setGameType] =
    useState("POKER");



  const [entryFee,setEntryFee] =
    useState("");



  const [maxParticipants,setMaxParticipants] =
    useState("");



  const [startTime,setStartTime] =
    useState("");



  const [registrationDeadline,setRegistrationDeadline] =
    useState("");





  const [prizeStructure,setPrizeStructure] =
    useState([]);





  const [blindStructure,setBlindStructure] =
    useState({

      levels:[],

    });





  const [pokerTournament,setPokerTournament] =
    useState(null);





  // 이미지 상태
  // changed:
  // false = 기존 이미지 유지
  // true = 이미지 변경 발생

  const [images,setImages] =
    useState({

      primary:null,

      others:[],

      changed:false,

    });








  useEffect(()=>{


    const fetchTournament =
      async()=>{


        try {


          const response =
            await api.get(
              `/tournaments/${id}/`
            );



          const data =
            response.data;




          setTitle(
            data.title
          );



          setDescription(
            data.description
          );



          setGameType(
            data.game_type
          );



          setEntryFee(
            data.entry_fee
          );



          setMaxParticipants(
            data.max_participants
          );



          setStartTime(
            data.start_time
              .slice(0,16)
          );



          setRegistrationDeadline(
            data.registration_deadline
              .slice(0,16)
          );





          setPrizeStructure(
            convertPrizeToEditor(
              data.prize_structure
            )
          );






          if(data.poker_tournament){


            setPokerTournament({

              ...data.poker_tournament,

            });




            setBlindStructure(

              data.poker_tournament
                .blind_structure

            );


          }



          setImages({

            primary:

              data.images?.find(
                image =>
                  image.is_primary
              ) || null,



            others:

              data.images?.filter(
                image =>
                  !image.is_primary
              ) || [],



            changed:false,

          });






          setLoading(false);



        }
        catch(error){


          console.error(error);



          alert(
            "Tournament loading failed."
          );


        }


      };



    fetchTournament();



  },[id]);







  const handleBlindChange =
    (data)=>{


      setBlindStructure(
        data
      );



      setPokerTournament(
        prev=>({

          ...prev,

          blind_structure:data,

        })
      );


    };

    const buildPokerData = () => {

    return {

      max_entries:
        Number(
          pokerTournament.max_entries
        ),


      max_reentries:
        Number(
          pokerTournament.max_reentries || 0
        ),


      max_addons:
        Number(
          pokerTournament.max_addons || 0
        ),


      starting_chips:
        Number(
          pokerTournament.starting_chips
        ),


      early_chips:
        Number(
          pokerTournament.early_chips || 0
        ),


      reentry_chips:
        Number(
          pokerTournament.reentry_chips
        ),


      addon_chips:
        Number(
          pokerTournament.addon_chips
        ),


      blind_structure:
        blindStructure,


      reentry_fee:
        Number(
          pokerTournament.reentry_fee || 0
        ),


      addon_fee:
        Number(
          pokerTournament.addon_fee || 0
        ),

    };

  };






  const convertPrizeToBackend = () => {


    const result = {};



    prizeStructure.forEach(
      item => {


        if(
          !item.startRank ||
          !item.endRank ||
          !item.amount
        ){

          return;

        }



        let key;



        if(
          item.startRank === item.endRank
        ){

          key =
            String(
              item.startRank
            );

        }
        else{

          key =
            `${item.startRank}-${item.endRank}`;

        }



        result[key] =
          Number(
            item.amount
          );


      }
    );



    return result;

  };







  const convertUrlToFile = async(image)=>{

    const response =
        await fetch(image.image);


    const blob =
        await response.blob();


    return new File(
        [blob],
        image.image.split("/").pop(),
        {
        type: blob.type,
        }
    );

    };

  const handleSubmit = async(e)=>{


    e.preventDefault();



    const formData =
      new FormData();




    formData.append(
      "title",
      title
    );



    formData.append(
      "description",
      description
    );



    formData.append(
      "game_type",
      gameType
    );



    formData.append(
      "entry_fee",
      entryFee
    );



    formData.append(
      "max_participants",
      maxParticipants
    );



    formData.append(
      "start_time",
      formatDateTimeToApi(
        startTime
      )
    );



    formData.append(
      "registration_deadline",
      formatDateTimeToApi(
        registrationDeadline
      )
    );



    formData.append(
      "prize_structure",
      JSON.stringify(
        convertPrizeToBackend()
      )
    );





    if(
      gameType === "POKER"
    ){


      formData.append(
        "poker_tournament",
        JSON.stringify(
          buildPokerData()
        )
      );


    }



    if(images.changed){


  const uploadImages = [];


  if(images.primary){

    if(images.primary instanceof File){

      uploadImages.push(
        images.primary
      );

    }

    else if(images.primary.image){

      uploadImages.push(
        await convertUrlToFile(
          images.primary
        )
      );

    }

  }




  for(
    const image of images.others
  ){

    if(image instanceof File){

      uploadImages.push(
        image
      );

    }

    else if(image.image){

      uploadImages.push(
        await convertUrlToFile(
          image
        )
      );

    }

  }





  uploadImages.forEach(
    image=>{

      formData.append(
        "images",
        image
      );

    }
  );


}






    try{


      await api.patch(

        `/tournaments/${id}/edit/`,

        formData

      );



      alert(
        "Tournament updated successfully."
      );



      navigate(
        `/shop-tournaments/${id}`
      );


    }
    catch(error){


      console.error(error);



      alert(
        JSON.stringify(
          error.response?.data ||
          "Update failed."
        )
      );


    }


  };









  if(loading){

    return (

      <div>
        Loading...
      </div>

    );

  }









  return (

  <div
    style={{
      padding:"20px",
    }}
  >


    <h1>
      Edit Tournament
    </h1>




    <form
      onSubmit={handleSubmit}
    >



      <div
        style={{
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"25px",
          marginBottom:"20px",
        }}
      >


        <h2>
          Tournament Information
        </h2>



        <div
          style={{
            display:"grid",
            gridTemplateColumns:"150px 1fr",
            gap:"15px",
          }}
        >


          <label>
            Title
          </label>


          <input
            style={{
              padding:"10px",
              fontSize:"16px",
              width:"100%",
              boxSizing:"border-box",
            }}

            value={title}

            onChange={(e)=>
              setTitle(
                e.target.value
              )
            }

          />




          <label>
            Description
          </label>



          <textarea

            style={{
              padding:"10px",
              fontSize:"16px",
              minHeight:"180px",
              width:"100%",
              boxSizing:"border-box",
              resize:"vertical",
            }}

            value={description}

            onChange={(e)=>
              setDescription(
                e.target.value
              )
            }

          />





          <label>
            Game Type
          </label>



          <select

            style={{
              padding:"10px",
              fontSize:"16px",
            }}

            value={gameType}

            onChange={(e)=>
              setGameType(
                e.target.value
              )
            }

          >

            <option value="POKER">
              Poker
            </option>


            <option value="CHESS">
              Chess
            </option>


            <option value="POKEMON_TCG">
              Pokémon TCG
            </option>


          </select>





          <label>
            Entry Fee
          </label>


          <input

            type="number"

            style={{
              padding:"10px",
              fontSize:"16px",
            }}

            value={entryFee}

            onChange={(e)=>
              setEntryFee(
                e.target.value
              )
            }

          />






          <label>
            Max Participants
          </label>



          <input

            type="number"

            style={{
              padding:"10px",
              fontSize:"16px",
            }}

            value={maxParticipants}

            onChange={(e)=>
              setMaxParticipants(
                e.target.value
              )
            }

          />


        </div>


      </div>







      <div

        style={{
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"25px",
          marginBottom:"20px",
        }}

      >


        <h2>
          Schedule
        </h2>




        <div

          style={{
            display:"grid",
            gridTemplateColumns:"150px 1fr",
            gap:"15px",
            alignItems:"center",
          }}

        >



          <label>
            Start Time
          </label>



          <input

            type="datetime-local"

            style={{
              padding:"10px",
              fontSize:"16px",
            }}

            value={startTime}

            onChange={(e)=>
              setStartTime(
                e.target.value
              )
            }

          />





          <label>
            Registration Deadline
          </label>



          <input

            type="datetime-local"

            style={{
              padding:"10px",
              fontSize:"16px",
            }}

            value={registrationDeadline}

            onChange={(e)=>
              setRegistrationDeadline(
                e.target.value
              )
            }

          />


        </div>


      </div>







      <PrizeStructureEditor

        value={
          prizeStructure
        }

        onChange={
          setPrizeStructure
        }

      />







      {
        gameType==="POKER" &&

        <>

          <PokerTournamentForm

            value={
              pokerTournament
            }

            onChange={
              setPokerTournament
            }

          />



          <BlindStructureEditor

            value={
              blindStructure
            }

            onChange={
              handleBlindChange
            }

          />

        </>

      }







      <ImageUploader

        value={
          images
        }

        onChange={
          setImages
        }

      />







      <button

        type="submit"

        style={{
          marginTop:"20px",
          padding:"12px 25px",
          fontSize:"16px",
        }}

      >

        Save Changes

      </button>




    </form>


  </div>

);

}



export default TournamentEditPage;