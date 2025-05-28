import { useState } from "react";
import { Button, Form, ListGroup, Row, Col } from "react-bootstrap";

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
          <Col xs={12} sm={8}>
            <Form.Control type="text" placeholder="Reminder title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Col>
          <Col xs={12} sm={4}>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Col>
        </Row>
        <Button variant="success" onClick={addReminder} className="w-100">
          Add
        </Button>
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
