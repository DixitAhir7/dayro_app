import React, { useDeferredValue, useEffect, useRef, useState } from 'react';
import { useArtist } from 'Customhooks/useArtist/Getartistscontext';
import axios from 'axios';
import ArtistData from 'components/artistcomponents/ArtistData';
import Modal from 'utilits/reusableCode/Modal';
import { portinstance } from 'axiosinstance/portinstance';
import { CornerDownLeft, CornerDownRight } from 'lucide-react';

// export const Error = (params, errorname) => {

//   const { formState: { errors } } = useForm();
//   { errors.params && <p className='text-red-400'>{errors.errorname.message} hello</p> }
// }

function Testjsx() {
  const postRef = useRef(null);
  const experiment = useArtist();

  const checkTypes = (value) => {
    if (Array.isArray(value)) {
      console.log("array")
    } else if (typeof value === 'object') {
      console.log("object")
    } else if (typeof value == null) {
      console.log('null')
    }
  };

  // when 1 function or api takes 1000 calls at same time
  // useEffect(() => {
  //   let i = checkTypes(5);
  //   for (let index = 0; index < 1000; index++) {
  //     const idk = checkTypes(index);
  //     console.log("idk", idk);
  //   };
  // }, []);

  const dummydata = {
    name: "dixitahir",
    identity: "dumb"
  };

  useEffect(() => {
    // localStorage.setItem('token', JSON.stringify(dummydata))
  }, []);

  const result = checkTypes(null);

  // useEffect(() => {
  //   postRef.current.focus();
  // }, []);

  const make = 'Ford';
  const model = 'Mustang';
  const car = { make, model };

  const something = new Array();
  if (something === Array.isArray) {
    const obj = new {}
    return console.log(obj)
  }

  const [test, setTest] = useState('');

  const handleTest = async (e) => {
    e.preventDefault();
    const res = await axios.post('/test', { test })
    console.log(res.data);
  };

  const testRef = useRef();

  const handleBlur = (e) => {
    // console.log(e)
    console.log('blue event called')
  }

  const names = [
    { name: 'dixit' },
    { name: 'jayminsir' },
    { name: 'pratham' },
    { name: 'devang' },
  ]

  const [globalartistdata, setGlobally] = useState(ArtistData);

  const addtoJson = (newArtist) => {
    setGlobally([...globalartistdata, newArtist]);
  };

  useEffect(() => {
    addtoJson({ id: 111, name: 'Mango', proffesion: 'singers', image: 'helo' })
  }, []);

  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", image);
  }

  const [api, setApi] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setApi(json))
  }, []);


  // const [file, setFile] = useState(null);

  // const handleChange = (e) => {
  //   setFile(e.target.files[0]); // store file in state
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!file) return alert("Please select an image");

  //   const formData = new FormData();
  //   formData.append("image", file);
  //   const values = Object.fromEntries(formData);
  //   console.log(values);
  // };

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [allImages, setAllImages] = useState([]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Select an image first!');
    const formData = new FormData();
    formData.append('image', file);

    const values = Object.fromEntries(formData);
    console.log(values);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedImage(res.data.imageUrl);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/images');
      setAllImages(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load images');
    }
  };

  const modaldata = [
    { id: 1, msg: "hello 1" },
    { id: 2, msg: "hello 2" },
    { id: 3, msg: "hello 3" }
  ];

  const [isOpen, setOpen] = useState(false);

  const [data] = useState([{
    userinfo: [{
      name: "dixit",
      age: 21,
      bf: "rp"
    }],
    artistinfo: [{
      name: "devayt khavad",
      age: 40,
      famous: "rano rana ni rite"
    }]
  }]);

  const [text, setText] = useState('');
  const defered = useDeferredValue(text);

  const handleClick = (e) => {
    const text = e.target.innerText;
    console.log("Clicked:", text);
  };


  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(true);
      document.body.appendChild(script);
    });
  };

  const razorpayCheckout = async () => {

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    const data = await portinstance.get('/order');
    console.log(data.data);

    const options = {
      key: import.meta.env.VITE_RAZORPAYKEY,
      amount: data.data.amount,
      currency: data.data.currency,
      description: "dayro checkout",
      order_id: data.data.id,
      handler: async function (res) {
        console.log(res)
        window.alert('payment done');
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  };

  // console.time("filling array");
  // const array = Array(10000000).fill(96);
  // console.timeEnd("filling array")

  const [isOn, setOn] = useState(false);

  return (
    <>
      <main>

        <div onClick={() => setOn(prev => !prev)}>
          {
            isOn ?
              <CornerDownRight /> :
              <CornerDownLeft />
          }
        </div>

        <button onClick={handleClick} id='btn1' type='button'>select</button>
        <button onClick={handleClick} type='button' id='btn2'>Decline</button>


        <input type="text" placeholder='type' value={text} onChange={(e) => setText(e.target.value)}  /* onBlur={handleBlur} */ />

        <button onClick={razorpayCheckout} type='button'>open razorpay</button>
        {
          text && <p>{defered}</p>
        }

        {/* <input onChange={(e) => setTest(e.target.value)} value={test} type="text" placeholder="enter name" />
        <button onClick={handleTest}>submit</button> */}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Upload
        </button>

        {
          isOpen &&
          <Modal>
            {
              modaldata.map(d => (
                <>
                  <h1>{d.msg}</h1>
                </>
              ))
            }
          </Modal>
        }
        <button type='button' onClick={() => setOpen(modaldata.map(d => d.id))}>opem</button>

        <button
          onClick={fetchImages}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Get All Images
        </button>

        {allImages.length > 0 && (
          <div className="mt-8 w-full flex flex-wrap justify-center gap-4">
            {allImages.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:5000/${img}`}
                alt={`uploaded-${idx}`}
                className="w-32 h-32 object-cover rounded-md shadow"
              />
            ))}
          </div>
        )}


        {/* <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md space-y-4 w-96"
        >
          <h1 className="text-xl font-semibold text-gray-700">Upload Form</h1>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form> */}

        {/* <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleChange} />
          <button type="submit">Upload</button>
        </form> */}
      </main>
    </>
  );
};


export default Testjsx;