import { useState, useEffect, useRef } from "react";


const createLevel = (level) => ({
  level,
  big_blind: "",
  small_blind: "",
  ante: "",
  duration_minutes: "",
});



function BlindStructureEditor({
  value,
  onChange,
}) {



  const initialized =
    useRef(false);



  const [levels, setLevels] =
    useState([]);




  useEffect(() => {


    if(
      initialized.current
    ){
      return;
    }



    if(
      value?.levels &&
      value.levels.length > 0
    ){

      setLevels(

        value.levels.map(
          (level)=>({

            level:
              level.level,

            big_blind:
              String(
                level.big_blind
              ),

            small_blind:
              String(
                level.small_blind
              ),

            ante:
              level.ante === 0
                ? ""
                :
                String(
                  level.ante
                ),

            duration_minutes:
              String(
                level.duration_minutes
              ),

          })
        )

      );


    } else {


      setLevels(

        Array.from(
          {
            length:10
          },
          (_,index)=>
            createLevel(
              index+1
            )
        )

      );


    }


    initialized.current = true;


  }, []);






  const updateLevel = (
    index,
    field,
    inputValue
  ) => {


    const updatedLevels =
      levels.map(
        (level,i)=>

          i === index

          ?

          {
            ...level,
            [field]:
              inputValue,
          }

          :

          level

      );



    setLevels(
      updatedLevels
    );


    sendData(
      updatedLevels
    );


  };






  const addLevel = ()=>{


    const updatedLevels = [

      ...levels,

      createLevel(
        levels.length + 1
      )

    ];



    setLevels(
      updatedLevels
    );


    sendData(
      updatedLevels
    );


  };






  const deleteLevel = (
    index
  )=>{


    const filtered =
      levels.filter(
        (_,i)=>
          i !== index
      );



    const updatedLevels =
      filtered.map(
        (item,index)=>({

          ...item,

          level:
            index+1,

        })
      );



    setLevels(
      updatedLevels
    );


    sendData(
      updatedLevels
    );


  };







  const sendData = (
    data
  )=>{


    const validLevels =
      data.filter(
        (level)=>

          level.big_blind !== "" &&

          level.small_blind !== "" &&

          level.duration_minutes !== ""

      );



    const result = {


      levels:

        validLevels.map(
          (level)=>(

            {

              level:
                level.level,


              big_blind:
                Number(
                  level.big_blind
                ),


              small_blind:
                Number(
                  level.small_blind
                ),


              ante:

                level.ante === ""

                ?

                0

                :

                Number(
                  level.ante
                ),



              duration_minutes:
                Number(
                  level.duration_minutes
                ),


            }

          )

        )


    };



    onChange(
      result
    );


  };







  return (

    <div
      style={{

        border:
          "1px solid #ddd",

        borderRadius:
          "10px",

        padding:
          "25px",

        marginTop:
          "20px",

        marginBottom:
          "20px",

      }}
    >


      <h2>
        Blind Structure
      </h2>





      <div
        style={{

          display:
            "grid",

          gridTemplateColumns:
            "80px 1fr 1fr 1fr 1fr 90px",

          gap:
            "10px",

          alignItems:
            "center",

          padding:
            "10px 0",

          fontWeight:
            "bold",

          borderBottom:
            "1px solid #ddd",

        }}
      >

        <span>
          Level
        </span>

        <span>
          Big Blind
        </span>

        <span>
          Small Blind
        </span>

        <span>
          Ante
        </span>

        <span>
          Duration
        </span>

        <span>
          Action
        </span>


      </div>





      {
        levels.map(
          (level,index)=>(


            <div
              key={index}
              style={{

                display:
                  "grid",

                gridTemplateColumns:
                  "80px 1fr 1fr 1fr 1fr 90px",

                gap:
                  "10px",

                alignItems:
                  "center",

                padding:
                  "12px 0",

                borderBottom:
                  "1px solid #eee",

              }}
            >



              <span>
                {level.level}
              </span>




              <input
                type="number"
                value={
                  level.big_blind
                }
                placeholder="BB"
                onChange={
                  (e)=>
                    updateLevel(
                      index,
                      "big_blind",
                      e.target.value
                    )
                }
              />




              <input
                type="number"
                value={
                  level.small_blind
                }
                placeholder="SB"
                onChange={
                  (e)=>
                    updateLevel(
                      index,
                      "small_blind",
                      e.target.value
                    )
                }
              />




              <input
                type="number"
                value={
                  level.ante
                }
                placeholder="Ante"
                onChange={
                  (e)=>
                    updateLevel(
                      index,
                      "ante",
                      e.target.value
                    )
                }
              />




              <div
                style={{

                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "5px",

                }}
              >

                <input
                  type="number"
                  value={
                    level.duration_minutes
                  }
                  placeholder="Time"
                  onChange={
                    (e)=>
                      updateLevel(
                        index,
                        "duration_minutes",
                        e.target.value
                      )
                  }
                />

                <span>
                  mins
                </span>


              </div>





              <button
                type="button"
                onClick={()=>
                  deleteLevel(
                    index
                  )
                }
              >
                Delete
              </button>



            </div>


          )
        )
      }





      <button
        type="button"
        onClick={
          addLevel
        }
        style={{

          marginTop:
            "20px",

        }}
      >

        + Add Level

      </button>




    </div>

  );

}


export default BlindStructureEditor;