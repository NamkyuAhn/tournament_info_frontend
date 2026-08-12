import { useState, useEffect, useRef } from "react";


const createLevel = (level) => ({
  type: "LEVEL",
  level,
  big_blind: "",
  small_blind: "",
  ante: "",
  duration_minutes: "",
});

const createBreak = () => ({
  type: "BREAK",
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
        value.levels.map((item) => {

          if (item.type === "BREAK") {

            return {
              type: "BREAK",
              duration_minutes: String(
                item.duration_minutes
              ),
            };

          }

          return {
            type: "LEVEL",

            level: item.level,

            big_blind: String(
              item.big_blind
            ),

            small_blind: String(
              item.small_blind
            ),

            ante:
              item.ante === 0
                ? ""
                : String(item.ante),

            duration_minutes: String(
              item.duration_minutes
            ),
          };

        })
      );


    } else {


      setLevels(

        Array.from(
          {
            length:5
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

  const addLevel = () => {
    const nextLevelNumber =
      levels.filter(
        (item) => item.type === "LEVEL"
      ).length + 1;

    const updatedLevels = [
      ...levels,
      createLevel(nextLevelNumber),
    ];

    setLevels(updatedLevels);
    sendData(updatedLevels);
  };

  const addBreak = (index) => {
    const updatedLevels = [
      ...levels.slice(0, index + 1),
      createBreak(),
      ...levels.slice(index + 1),
    ];

    setLevels(updatedLevels);
    sendData(updatedLevels);
  };





const deleteLevel = (index) => {

  const filtered =
    levels.filter(
      (_, i) => i !== index
    );

  let levelNumber = 1;

  const updatedLevels =
    filtered.map((item) => {

      if (item.type === "BREAK") {
        return item;
      }

      return {
        ...item,
        level: levelNumber++,
      };
    });

  setLevels(updatedLevels);

  sendData(updatedLevels);
};

const sendData = (data) => {

  const result = {

    levels: data
      .filter((item) => {

        if (item.type === "BREAK") {

          return (
            item.duration_minutes !== ""
          );

        }

        return (
          item.big_blind !== "" &&
          item.small_blind !== "" &&
          item.duration_minutes !== ""
        );

      })
      .map((item) => {

        if (item.type === "BREAK") {

          return {
            type: "BREAK",
            duration_minutes: Number(
              item.duration_minutes
            ),
          };

        }

        return {

          type: "LEVEL",

          level: item.level,

          big_blind: Number(
            item.big_blind
          ),

          small_blind: Number(
            item.small_blind
          ),

          ante:
            item.ante === ""
              ? 0
              : Number(item.ante),

          duration_minutes: Number(
            item.duration_minutes
          ),

        };

      }),

  };

  onChange(result);

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
            "60px 0.8fr 0.8fr 0.8fr 0.9fr 150px",

          gap:
            "8px",

          alignItems:
            "center",

          padding:
            "12px 0",

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
  levels.map((level,index)=>{

    if(level.type === "BREAK"){

      return (

        <div
          key={index}
          style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr 160px",
            gap:"10px",
            alignItems:"center",
            padding:"12px 0",
            background:"#f5f5f5",
            borderBottom:"1px solid #eee",
          }}
        >

          <strong>
            BREAK
          </strong>

          <div>

            <input
              type="number"
              value={
                level.duration_minutes
              }
              onChange={(e)=>
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
              deleteLevel(index)
            }
          >
            Delete
          </button>

        </div>

      );

    }

    return (

      <div
        key={index}
        style={{
          display:"grid",
          gridTemplateColumns:
            "60px 0.8fr 0.8fr 0.8fr 0.9fr 150px",
          gap:"10px",
          alignItems:"center",
          padding:"12px 0",
          borderBottom:"1px solid #eee",
        }}
      >

        <span>
          {level.level}
        </span>

        <input
          type="number"
          value={level.big_blind}
          placeholder="BB"
          onChange={(e)=>
            updateLevel(
              index,
              "big_blind",
              e.target.value
            )
          }
        />

        <input
          type="number"
          value={level.small_blind}
          placeholder="SB"
          onChange={(e)=>
            updateLevel(
              index,
              "small_blind",
              e.target.value
            )
          }
        />

        <input
          type="number"
          value={level.ante}
          placeholder="Ante"
          onChange={(e)=>
            updateLevel(
              index,
              "ante",
              e.target.value
            )
          }
        />

        <div
          style={{
            display:"flex",
            gap:"5px",
            alignItems:"center",
          }}
        >

          <input
            type="number"
            value={
              level.duration_minutes
            }
            placeholder="Time"
            onChange={(e)=>
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

      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        <button
          type="button"
          onClick={()=>
            deleteLevel(index)
          }
        >
          Delete
        </button>

        <button
          type="button"
          onClick={() =>
            addBreak(index)
          }
        >
          + Break
        </button>
      </div>
      </div>
    );

  })
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