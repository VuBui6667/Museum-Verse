import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { signAndConfirmTransactionFe } from "../../../../utils/utilityfunc";
import { X_API_KEY } from "../../../../config/variable";
import { NOTIFICATION_TYPE, notify } from "../../../../utils/notify";
import { useBoundStore } from "../../../../zustand";

interface FormValues {
  network: string;
  name: string;
  symbol: string;
  description: string;
  roy: string;
  maxSup: string;
}

interface AttributeType {
  trait_type: string;
  value: string;
}

const validationSchema = yup.object({
  network: yup.string(),
  name: yup.string().required("Enter NFT's name"),
  symbol: yup.string().required("Enter NFT's symbol"),
  description: yup.string().required("Add a small story to this NFT"),
});

export const CreateForm = () => {
  const [displayPic, setDisplayPic] = useState(
    "/public/images/file_default.jpeg"
  );
  const [file, setFile] = useState<File>();
  const [attributes, setAttributes] = useState<AttributeType[]>([
    { trait_type: "edification", value: "100" },
  ]);
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }));

  const callback = (signature: any, result: any) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    if (signature.err === null) {
      notify(NOTIFICATION_TYPE.SUCCESS, "Tạo NFT thành công");
    }
  };

  const onCreateNFT = async (values: FormValues) => {
    console.log("values...", values);

    let formData = new FormData();

    formData.append("network", values.network);
    formData.append("wallet", accountInfo.publicKey);
    formData.append("name", values.name);
    formData.append("symbol", values.symbol);
    formData.append("description", values.description);
    formData.append("attributes", JSON.stringify(attributes));
    formData.append("external_url", "");
    formData.append("royalty", values.roy);
    formData.append("max_supply", values.maxSup);
    formData.append("file", file as File);

    await axios({
      url: "https://api.shyft.to/sol/v1/nft/create_detach",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": X_API_KEY,
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then(async (response) => {
        console.log("1");

        const transaction = response.data.result.encoded_transaction;
        const ret_result = await signAndConfirmTransactionFe(
          values.network,
          transaction,
          callback
        );
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const onAddAttribute = () => {
    setAttributes((prev) => [...prev, { trait_type: "", value: "" }]);
  };

  // const onDeleteAttribute = (index: number) => {
  //   setAttributes()
  // }

  const onChangeAttributeType = (index: number, value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index].trait_type = value;
    setAttributes((prev) => newAttributes);
  };

  const onChangeAttributeValue = (index: number, value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index].value = value;
    setAttributes((prev) => newAttributes);
  };

  const onDeleteAttribute = (atrIndex: number) => {
    let newAttributes: AttributeType[] = [];

    attributes.forEach((value, index) => {
      if (index !== atrIndex) {
        newAttributes.push(value);
      }
    });
    setAttributes((prev) => newAttributes);
  };

  return (
    <Formik
      initialValues={{
        network: "devnet",
        name: "",
        symbol: "",
        description: "",
        maxSup: "0",
        roy: "5",
      }}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => {
        onCreateNFT(values);
      }}
    >
      <Form>
        <div>
          <div className="img-container text-center mt-5">
            <div className="uploaded-img flex items-center justify-center">
              <img
                src={displayPic}
                alt="To be uploaded"
                className="w-48 h-48 object-fill"
              />
            </div>
            <button className="m-2 bg-amber-400 p-2 rounded-xl hover:bg-amber-500">
              Change image
            </button>
            <br></br>
            <input
              type="file"
              style={{
                position: "absolute",
                zIndex: "3",
                marginTop: "-50px",
                marginLeft: "-70px",
                width: "150px",
                height: "40px",
                opacity: "0",
              }}
              onChange={(e) => {
                if (e.target.files) {
                  const [file_selected] = e.target.files;

                  setFile(e.target.files[0]);
                  setDisplayPic(URL.createObjectURL(file_selected));
                }
              }}
            />
            <div className="mb-3"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="m-2">Network</span>
              <Field
                as="select"
                name="network"
                className="w-5/6 rounded-lg p-2"
              >
                <option value="mainnet">Mainnet</option>
                <option value="devnet">Devnet</option>
                <option value="localnet">Localnet</option>
              </Field>
            </div>

            <div className="flex justify-between">
              <span className="m-2">NFT name</span>
              <Field
                name="name"
                placeholder="NFT name"
                className="w-5/6 rounded-lg p-2"
              />
            </div>

            <div className="flex justify-between">
              <span className="m-2">NFT symbol</span>
              <Field
                name="symbol"
                placeholder="NFT symbol"
                className="w-5/6 rounded-lg p-2"
              />
            </div>

            <div className="flex justify-between">
              <span className="m-2">NFT description</span>
              <Field
                name="description"
                placeholder="NFT description"
                className="w-5/6 rounded-lg p-2"
              />
            </div>

            <div className="flex justify-between">
              <span className="m-2">NFT attributes</span>
              <div className="w-5/6 rounded-lg p-2">
                <button type="button" onClick={onAddAttribute}>
                  Add attribute
                </button>
                {attributes.map((attribute, index) => (
                  <div key={index} className="mt-2">
                    <input
                      value={attribute.trait_type}
                      onChange={(e) =>
                        onChangeAttributeType(index, e.target.value)
                      }
                      type="text"
                      placeholder="Benefit"
                      className="rounded-lg p-2 mr-2"
                    />
                    <input
                      value={attribute.value}
                      onChange={(e) =>
                        onChangeAttributeValue(index, e.target.value)
                      }
                      type="text"
                      placeholder="Value"
                      className="rounded-lg p-2 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => onDeleteAttribute(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="p-2 bg-amber-400 hover:bg-amber-500 rounded-lg px-4"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};
