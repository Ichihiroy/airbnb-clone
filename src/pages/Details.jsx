import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPropertyById } from "../services/propertyServices";
import Loading from "./Loading";

const Details = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyById(id).then((data) => {
      setProperty(data);
    });
  }, [id]);

  if (!property) {
    return <Loading />;
  }

  return <div>Property Details</div>;
};

export default Details;
