import { useEffect, useState } from "react";


function ImageUploader({
  value,
  onChange,
}) {


  const [primaryImage, setPrimaryImage] =
    useState(null);


  const [otherImages, setOtherImages] =
    useState([]);



  useEffect(() => {

    if (!value) {
      return;
    }


    setPrimaryImage(
      value.primary ?? null
    );


    setOtherImages(
      value.others ?? []
    );


  }, [value]);





  const isOldImage = (image) => {

    return (
      image &&
      typeof image === "object" &&
      image.image
    );

  };





  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }


    if (isOldImage(image)) {

      return image.image;

    }


    return URL.createObjectURL(
      image
    );

  };





  const emitChange = (
    primary,
    others
  ) => {


    onChange({

      primary,

      others,

      changed:true,

    });


  };

  
  const handlePrimaryImage = (e) => {


    const file =
      e.target.files[0];


    if (!file) {
      return;
    }



    setPrimaryImage(
      file
    );


    emitChange(
      file,
      otherImages
    );


  };






  const handleOtherImages = (e) => {


    const files =
      Array.from(
        e.target.files
      );


    if(files.length === 0){
      return;
    }



    const updated = [

      ...otherImages,

      ...files,

    ];



    setOtherImages(
      updated
    );


    emitChange(
      primaryImage,
      updated
    );


  };







  const removeOtherImage = (
    index
  ) => {


    const updated =
      otherImages.filter(
        (_, i)=>
          i !== index
      );



    setOtherImages(
      updated
    );



    emitChange(
      primaryImage,
      updated
    );


  };








  const removePrimaryImage = () => {


    if(
      isOldImage(primaryImage)
    ){

      alert(
        "Existing representative image cannot be deleted. Upload a new image instead."
      );


      return;

    }



    setPrimaryImage(
      null
    );



    emitChange(
      null,
      otherImages
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
        Images
      </h2>





      <div

        style={{

          display:
            "flex",

          flexDirection:
            "column",

          gap:
            "25px",

        }}

      >




        <div

          style={{

            borderBottom:
              "1px solid #eee",

            paddingBottom:
              "20px",

          }}

        >


          <h3>
            Representative Image
          </h3>



          {
            primaryImage && (

              <div>


                <img

                  src={
                    getImageUrl(
                      primaryImage
                    )
                  }

                  alt="primary"

                  style={{

                    width:
                      "220px",

                    height:
                      "160px",

                    objectFit:
                      "cover",

                    borderRadius:
                      "8px",

                  }}

                />



                <br />


                <button

                  type="button"

                  onClick={
                    removePrimaryImage
                  }

                  style={{

                    marginTop:
                      "10px",

                  }}

                >

                  Remove

                </button>



              </div>

            )

          }




          <input

            type="file"

            accept="image/*"

            onChange={
              handlePrimaryImage
            }

            style={{

              marginTop:
                "15px",

            }}

          />


        </div>







        <div>


          <h3>
            Other Images
          </h3>



          <div

            style={{

              display:
                "flex",

              flexWrap:
                "wrap",

              gap:
                "15px",

            }}

          >


            {
              otherImages.map(
                (
                  image,
                  index
                )=>(


                  <div

                    key={index}

                  >


                    <img

                      src={
                        getImageUrl(
                          image
                        )
                      }

                      alt="other"

                      style={{

                        width:
                          "150px",

                        height:
                          "120px",

                        objectFit:
                          "cover",

                        borderRadius:
                          "8px",

                      }}

                    />



                    <br />


                    <button

                      type="button"

                      onClick={()=>
                        removeOtherImage(
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


          </div>





          <input

            type="file"

            accept="image/*"

            multiple

            onChange={
              handleOtherImages
            }

            style={{

              marginTop:
                "15px",

            }}

          />


        </div>




      </div>



    </div>

  );

}


export default ImageUploader;