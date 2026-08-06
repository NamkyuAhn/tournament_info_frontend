import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import PrizeStructureEditor from "../components/PrizeStructureEditor";
import BlindStructureEditor from "../components/BlindStructureEditor";
import ImageUploader from "../components/ImageUploader";
import PokerTournamentForm from "../components/PokerTournamentForm";

import { formatDateTimeToApi } from "../utils/dateFormatToApi";


function TournamentCreatePage() {

  const navigate = useNavigate();


  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [gameType, setGameType] =
    useState("POKER");

  const [entryFee, setEntryFee] =
    useState("");

  const [maxParticipants, setMaxParticipants] =
    useState("");

  const [startTime, setStartTime] =
    useState("");

  const [registrationDeadline, setRegistrationDeadline] =
    useState("");


  const [prizeStructure,setPrizeStructure] = useState([
    {
        startRank:1,
        endRank:1,
        amount:""
    }
    ]);


  const [blindStructure, setBlindStructure] = useState({
    levels: Array.from(
        { length: 10 },
        (_, index) => ({
        level: index + 1,
        big_blind: "",
        small_blind: "",
        ante: "",
        duration_minutes: "",
        })
    ),
    });


  const [pokerTournament, setPokerTournament] =
    useState({

      max_entries: "",
      max_reentries: "",
      max_addons: "",

      starting_chips: "",
      early_chips: "",

      reentry_chips: "",
      addon_chips: "",

      reentry_fee: "",
      addon_fee: "",

    });



  const [images, setImages] =
    useState({

      primary: null,
      others: [],

    });



  const handleImages = (data) => {

    setImages(prev => ({
        ...prev,
        primary: data.primary,
        others: data.others,
    }));

    };  



  const handleBlindChange = (data) => {

    setBlindStructure(data);


    setPokerTournament(prev => ({
      ...prev,
      blind_structure:data,
    }));

  };



  const validateCommon = () => {


    if(!title.trim()) {

      alert(
        "Title is required."
      );

      return false;

    }


    if(!entryFee) {

      alert(
        "Entry fee is required."
      );

      return false;

    }


    if(!maxParticipants) {

      alert(
        "Max participants is required."
      );

      return false;

    }


    if(!startTime || !registrationDeadline) {

      alert(
        "Tournament schedule is required."
      );

      return false;

    }


    if(
      Object.keys(prizeStructure).length === 0
    ){

      alert(
        "Prize structure is required."
      );

      return false;

    }


    if(!images.primary) {

      alert(
        "Representative image is required."
      );

      return false;

    }


    return true;

  };



  const validatePoker = () => {


    if(!pokerTournament.max_entries){

      alert(
        "Max Entries is required."
      );

      return false;

    }


    if(!pokerTournament.starting_chips){

      alert(
        "Starting Chips is required."
      );

      return false;

    }


    if(!pokerTournament.reentry_chips){

      alert(
        "Reentry Chips is required."
      );

      return false;

    }


    if(!pokerTournament.addon_chips){

      alert(
        "Addon Chips is required."
      );

      return false;

    }


    const validBlind =
    blindStructure.levels.some(
        level =>
        level.big_blind !== "" &&
        level.small_blind !== "" &&
        level.duration_minutes !== ""
    );


    if(!validBlind){

    alert(
    "At least one blind level is required."
    );

    return false;

    }


    return true;

  };



  const buildPokerData = () => {


    return {


      max_entries:
        Number(
          pokerTournament.max_entries
        ),


      max_reentries:
        pokerTournament.max_reentries === ""
        ? 0
        :
        Number(
          pokerTournament.max_reentries
        ),



      max_addons:
        pokerTournament.max_addons === ""
        ? 0
        :
        Number(
          pokerTournament.max_addons
        ),



      starting_chips:
        Number(
          pokerTournament.starting_chips
        ),



      early_chips:
        pokerTournament.early_chips === ""
        ? 0
        :
        Number(
          pokerTournament.early_chips
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
        pokerTournament.reentry_fee === ""
        ? 0
        :
        Number(
          pokerTournament.reentry_fee
        ),



      addon_fee:
        pokerTournament.addon_fee === ""
        ? 0
        :
        Number(
          pokerTournament.addon_fee
        ),

    };


  };


  const buildPrizeData = () => {

    const result = {};

    prizeStructure.forEach((item)=>{

        if(
        !item.startRank ||
        !item.endRank ||
        !item.amount
        ){
        return;
        }


        const key =
        item.startRank === item.endRank
        ? String(item.startRank)
        : `${item.startRank}-${item.endRank}`;


        result[key] =
        Number(item.amount);

    });


    return result;

    };

  const handleSubmit = async(e)=>{


    e.preventDefault();


    if(!validateCommon()) {

      return;

    }



    if(gameType === "POKER") {


      if(!validatePoker()) {

        return;

      }

    }



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
        buildPrizeData()
      )
    );



    if(gameType === "POKER") {

        

      formData.append(
        "poker_tournament",
        JSON.stringify(
          buildPokerData()
        )
      );


    }



    if(images.primary){

        formData.append(
        "images",
        images.primary
        );

    }



    images.others.forEach(
      image => {

        formData.append(
          "images",
          image
        );

      }
    );


    try {


      const response =
        await api.post(
          "/tournaments/create/",
          formData
        );



      alert(
        "Tournament created successfully."
      );



      navigate(
        `/shop-tournaments/${response.data.data.id}`
      );



    } catch(error) {


      console.error(error);



      alert(
        JSON.stringify(
          error.response?.data ||
          "Tournament creation failed."
        )
      );


    }


  };



return (

    <div
    style={{
        padding: "20px",
    }}
    >


    <h1>
    Create Tournament
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
        setTitle(e.target.value)
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
        value={prizeStructure}
        onChange={setPrizeStructure}
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
    value={blindStructure}
    onChange={handleBlindChange}
    />


    </>

    }





    <ImageUploader
    onChange={
    handleImages
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
    Create Tournament
    </button>




    </form>



    </div>

    );

}


export default TournamentCreatePage;