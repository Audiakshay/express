import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [nameRef, setNameRef] = useState('');
  const [descRef, setDescRef] = useState('');
  const [priceRef, setPriceRef] = useState('');
  const [putEnabled, setPutEnabled] = useState(false);
  const [data1, setData1] = useState([]);
  const [id, setID] = useState(0);

  console.log(nameRef);
  console.log(id);

  const post = () => {
    axios
      .post("http://localhost:8080/create", {
        itemName: nameRef,
        description: descRef,
        price: priceRef,
      })
      .then(() => console.log("success"));
  };

  const edit = (obj) => {
    setPutEnabled(true);
    setNameRef(obj.itemName);
    setDescRef(obj.description);
    setPriceRef(obj.price);
    setID(obj.id);
  }

  const put = () => {
    axios.put(`http://localhost:8080/put/${id}`,  {
      itemName: nameRef,
      description: descRef,
      price: priceRef,
    })
    setPutEnabled(false);
  }

  const fetchData = async () => {
    const res = await axios.get('http://localhost:8080/create');
    const d = await res.data;
    setData1(d);
  };

  const dele = (id) => {
    axios.delete(`http://localhost:8080/delete/${id}`)
    console.log('delete', id);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        putEnabled ? put() : post();
      }}
    >
      <input name="itemName" value={putEnabled ? nameRef : undefined} onChange={(e) => setNameRef(e.target.value)}  placeholder="itemName" />
      <input name="description" value={putEnabled ? descRef : undefined} onChange={(e) => setDescRef(e.target.value)} placeholder="description" />
      <input name="price" value={putEnabled ? priceRef : undefined} onChange={(e) => setPriceRef(e.target.value)} placeholder="price" />
      <button type="submit">Submit</button>
    </form>
    {
      data1.map(x => <div key={x.id} >
        <p>name: {x.itemName}</p>
        <p>desc: {x.description}</p>
        <button onClick={() => edit(x)}>edit</button>
        <button onClick={() => dele(x.id)}>delete</button>
        </div>)
    }
    </>
  );
};

export default App;
