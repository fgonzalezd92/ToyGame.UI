import React from "react";
import { useDataService } from "../services/data-service";
import { Button, Modal, Form } from "react-bootstrap";

function InsertModal({ showModal = false, onCloseModal, setInserted }) {
  const [data, setData] = React.useState(null);
  const [validated, setValidated] = React.useState(false);
  const [, , Insert] = useDataService("Product");
  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    const { name, company, price, description, ageRestriction } = form.elements;
    const data = {
      name: name.value,
      price: price.value,
      company: company.value,
      ageRestriction: ageRestriction.value,
      description: description.value,
    };

    const result = await Insert(data);

    if (result.id) {
      setInserted(true);
      onCloseModal();
    } // mensaje de error en el else
  }

  return (
    <Modal
      show={showModal}
      onShow={() => setValidated(false)}
      onHide={onCloseModal}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>Insert product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={onSubmit}
          onChange={setData}
        >
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              id="name"
              value={data?.name}
              onChange={setData}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="text"
              id="price"
              value={data?.price}
              onChange={setData}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control
              required
              type="text"
              id="company"
              value={data?.company}
              onChange={setData}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Maxium age</Form.Label>
            <Form.Control
              required
              type="number"
              id="ageRestriction"
              min={0}
              value={data?.ageRestriction}
              onChange={setData}
            />
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" id="description" onChange={setData}>
              {data?.description}
            </Form.Control>
          </Form.Group>
          <Button className="float-right" type="submit">
            Insert Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
function UpdateModal({
  data,
  setData,
  showModal = false,
  onCloseModal,
  setUpdated,
}) {
  const [validated, setValidated] = React.useState(false);
  const [, , , Edit] = useDataService("Product");

  async function onSubmit(event) {
    event.preventDefault();
    setUpdated(true);
    onCloseModal();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    const { id, name, company, price, description, ageRestriction } =
      form.elements;
    const data = {
      id: id.value,
      name: name.value,
      price: price.value,
      company: company.value,
      ageRestriction: ageRestriction.value,
      description: description.value,
    };

    const result = await Edit(data);
    if (result.id) {
      setUpdated(true);
      onCloseModal();
    }
  }

  return (
    <Modal
      show={showModal}
      onShow={() => setValidated(false)}
      onHide={onCloseModal}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>Update product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={onSubmit}
          onChange={setData}
        >
          <Form.Control
            type="hidden"
            id="id"
            value={data?.id}
            onChange={setData}
          />
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              id="name"
              value={data?.name}
              onChange={setData}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="text"
              id="price"
              value={data?.price}
              onChange={setData}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control
              required
              type="text"
              id="company"
              value={data?.company}
              onChange={setData}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Maxium age</Form.Label>
            <Form.Control
              required
              type="number"
              id="ageRestriction"
              min={0}
              value={data?.ageRestriction}
              onChange={setData}
            />
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              id="description"
              defaultValue={data?.description}
              onChange={setData}
            ></Form.Control>
          </Form.Group>
          <Button className="float-right" type="submit">
            Update Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export { InsertModal, UpdateModal };
