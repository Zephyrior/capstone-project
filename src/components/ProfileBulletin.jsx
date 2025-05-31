import { useState } from "react";
import { ButtonGroup, Container, ToggleButton } from "react-bootstrap";

const ProfileBulletin = () => {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Your Bulletin", value: "1" },
    { name: "Your Testimonies", value: "2" },
  ];
  return (
    <>
      <Container>
        <div className="border border-1 rounded-3 p-3" style={{ background: "#E5F5E0" }}>
          <ButtonGroup className="w-100">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={"outline-success"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
                className="flex-fill"
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </Container>
    </>
  );
};
export default ProfileBulletin;
