import { useEffect, useState } from "react";


const convertObjectToArray = (
  data
) => {


  if (!data) {

    return [
      {
        startRank: 1,
        endRank: 1,
        amount: "",
      },
    ];

  }

  if (Array.isArray(data)) {

    return data;

  }


  return Object.entries(
    data
  ).map(
    ([rank, amount]) => {


      if (
        rank.includes("-")
      ) {

        const [
          start,
          end,
        ] =
          rank.split("-");


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


};





function PrizeStructureEditor({
  value,
  onChange,
}) {



  const [prizes, setPrizes] =
    useState(
      convertObjectToArray(
        value
      )
    );




  useEffect(() => {


    setPrizes(
      convertObjectToArray(
        value
      )
    );


  }, [value]);





  const convertPrizeStructure = (
    data
  ) => {


    const result = {};



    data.forEach(
      (item) => {


        if (
          !item.startRank ||
          !item.endRank ||
          !item.amount
        ) {

          return;

        }



        let key;



        if (
          item.startRank === item.endRank
        ) {

          key =
            String(
              item.startRank
            );


        } else {

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





  const updatePrize = (
    index,
    field,
    value
  ) => {



    const updated =
      prizes.map(
        (item, i) =>
          i === index

            ? {

                ...item,

                [field]:

                  field === "amount"

                    ? value

                    : value === ""

                      ? ""

                      : Number(value),

              }

            : item
      );



    setPrizes(
      updated
    );



    onChange(
      updated
    );


  };






  const addPrize = () => {



    const last =
      prizes[
        prizes.length - 1
      ];



    const nextRank =
      last
        ? last.endRank + 1
        : 1;



    const updated = [

      ...prizes,

      {

        startRank:
          nextRank,

        endRank:
          nextRank,

        amount:
          "",

      },

    ];



    setPrizes(
      updated
    );


    onChange(
      updated
    );


  };






  const removePrize = (
    index
  ) => {


    if (
      prizes.length === 1
    ) {

      return;

    }



    const updated =
      prizes.filter(
        (_, i) =>
          i !== index
      );



    setPrizes(
      updated
    );



    onChange(
      updated
    );


  };







  const validateOverlap = () => {



    for (
      let i = 0;
      i < prizes.length;
      i++
    ) {



      for (
        let j = i + 1;
        j < prizes.length;
        j++
      ) {



        const a =
          prizes[i];


        const b =
          prizes[j];



        if (

          a.startRank &&

          a.endRank &&

          b.startRank &&

          b.endRank &&

          a.startRank <= b.endRank &&

          b.startRank <= a.endRank

        ) {


          alert(
            "Prize rank range overlaps."
          );


          return false;


        }


      }


    }



    return true;


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

        textAlign:
          "center",

      }}

    >



      <h2>
        Prize Structure
      </h2>





      {
        prizes.map(
          (
            prize,
            index
          ) => (


            <div

              key={index}

              style={{

                padding:
                  "20px 0",

                borderBottom:
                  "1px solid #eee",

                display:
                  "flex",

                justifyContent:
                  "center",

                alignItems:
                  "center",

                gap:
                  "15px",

              }}

            >



              <div>

                <label>
                  Start Rank
                </label>

                <br />


                <input

                  type="number"

                  value={
                    prize.startRank
                  }

                  onChange={
                    (e)=>
                      updatePrize(
                        index,
                        "startRank",
                        e.target.value
                      )
                  }

                  onBlur={
                    validateOverlap
                  }

                />

              </div>





              <span>
                ~
              </span>





              <div>

                <label>
                  End Rank
                </label>


                <br />


                <input

                  type="number"

                  value={
                    prize.endRank
                  }

                  onChange={
                    (e)=>
                      updatePrize(
                        index,
                        "endRank",
                        e.target.value
                      )
                  }

                  onBlur={
                    validateOverlap
                  }

                />


              </div>





              <div>


                <label>
                  Prize
                </label>


                <br />


                <input

                  type="number"

                  value={
                    prize.amount
                  }

                  onChange={
                    (e)=>
                      updatePrize(
                        index,
                        "amount",
                        e.target.value
                      )
                  }

                />


              </div>





              <button

                type="button"

                onClick={() =>
                  removePrize(
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
          addPrize
        }

        style={{
          marginTop:
            "20px",
        }}

      >

        + Add Prize

      </button>




    </div>

  );

}


export default PrizeStructureEditor;