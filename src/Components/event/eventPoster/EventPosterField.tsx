import { useRecordContext } from "react-admin";

export const EventPosterField = () => {
  const record = useRecordContext();
  if (!record || !record.eventPoster) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img
        src={record.eventPoster}
        alt="Event Poster"
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};
