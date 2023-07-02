import { useEffect, useState } from "react";

export default function PreviewDocs({ file, width, height ,handleClick}) {
  const [preview, setPreview] = useState(null);
  const handleReader = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };
  useEffect(() => {
    handleReader(file);
  },[file]);
  return (
    <div onClick={handleClick}>
      <img src={preview} alt="preview" className={`h-${height} w-${width} object-cover rounded-sm`}  />
    </div>
  );
}

// export default function PreviewDocs({ profile, identity, certificate }) {
//   //   const [previewProfile, setPreviewProfile] = useState(null);
//   const [previewDocs, setPreviewDocs] = useState({
//     profile: null,
//     identity: null,
//     certificate: null,
//   });
//   const handleReader = (file, key) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setPreviewDocs((prev) => {
//         return {
//           ...prev,
//           [key]: reader.result,
//         };
//       });
//     };
//   };
//   useEffect(() => {
//     profile && handleReader(profile, "profile");
//     identity && handleReader(identity, "identity");
//     certificate && handleReader(certificate, "certificate");
//   }, [profile,identity,certificate]);
//   return (
//     <>
//       <div className="flex">
//         {profile && (
//           <img
//             src={previewDocs.profile}
//             alt="preview pic"
//             height="150px"
//             width="150"
//           />
//         )}
//         {identity && (
//           <img
//             src={previewDocs.identity}
//             alt="preview pic"
//             height="150px"
//             width="150"
//           />
//         )}
//         {certificate && (
//           <img
//             src={previewDocs.certificate}
//             alt="preview pic"
//             height="150px"
//             width="150"
//           />
//         )}
//       </div>
//     </>
//   );
// }
