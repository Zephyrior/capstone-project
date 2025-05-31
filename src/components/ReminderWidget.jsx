import { useState } from "react";
import { Button, Form, ListGroup, Row, Col } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

const ReminderWidget = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const addReminder = () => {
    if (title && date) {
      setReminders([...reminders, { title, date }]);
      setTitle("");
      setDate("");
    }
  };

  const removeReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="border p-3 rounded shadow-sm mb-3" style={{ background: "#fff" }}>
      <h5>📝 Reminders</h5>
      <Form>
        <Row className="g-2 mb-2">
          <Col xs={12} lg={6}>
            <Form.Control type="text" placeholder="Reminder title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Col>
          <Col xs={12} lg={4}>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Col>
          <Col xs={12} lg={2}>
            <Button variant="outline-success" onClick={addReminder} className="w-100 border border-0">
              <PlusCircleFill className="d-none d-lg-block" />
              <span className="d-lg-none">
                Add reminder <PlusCircleFill />
              </span>
            </Button>
          </Col>
        </Row>
      </Form>

      <ListGroup className="mt-3">
        {reminders.map((reminder, i) => (
          <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{reminder.title}</strong> – <small>{reminder.date}</small>
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeReminder(i)}>
              ✕
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ReminderWidget;
