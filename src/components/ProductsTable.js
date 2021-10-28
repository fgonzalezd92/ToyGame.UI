import * as React from "react";
import { Button, Table } from "react-bootstrap";
import { InsertModal, UpdateModal } from "./Modals";
import { CurrencyFormat } from "../utils/number-format";
import { useDataService } from "../services/data-service";

function ProductsTable() {
  const [data, setData] = React.useState([]);
  const [showInsertModal, setShowInsertModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [updateData, setUpdateData] = React.useState(null);
  const [isFirstCall, setIsFirstCall] = React.useState(true);
  const [isInserted, setIsInserted] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [GetAll, , , , Remove] = useDataService("Product");

  React.useEffect(() => {
    async function GetAllData() {
      const dataResponse = await GetAll();
      setData(dataResponse);
    }

    if (isFirstCall || isUpdated || isInserted || isDeleted) {
      setIsFirstCall(false);
      setIsUpdated(false);
      setIsInserted(false);
      setIsDeleted(false);
      GetAllData();
    }
  }, [isFirstCall, isUpdated, isInserted, isDeleted, GetAll]);

  function onOpenInsModal() {
    setShowInsertModal(true);
  }

  function onCloseInsModal() {
    setShowInsertModal(false);
  }
  function onOpenUpdModal() {
    setShowUpdateModal(true);
  }

  function onCloseUpdModal() {
    setShowUpdateModal(false);
  }

  async function RemoveData(product) {
    const result = await Remove(product);

    if (result) {
      setIsDeleted(true);
    }
  }

  return (
    <>
      <Button variant="success" onClick={() => onOpenInsModal()}>
        Add new
      </Button>
      <InsertModal
        showModal={showInsertModal}
        onCloseModal={onCloseInsModal}
        setInserted={setIsInserted}
      />
      <UpdateModal
        data={updateData}
        setData={setUpdateData}
        setUpdated={setIsUpdated}
        showModal={showUpdateModal}
        onCloseModal={onCloseUpdModal}
      />
      <Table className="text-center" striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Price</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.ageRestriction}</td>
              <td>{CurrencyFormat(product.price)}</td>
              <td>{product.company}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setUpdateData(product);
                    onOpenUpdModal();
                  }}
                >
                  Update
                </Button>
                <span> </span>
                <Button
                  variant="danger"
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    const result = confirm("Do you want remove this element?");
                    if (result) {
                      RemoveData(product);
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ProductsTable;
