import { Form, Table, Badge, Button, Modal } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { fetchTodos } from "../../data/todos";

const Todos = () => {
    const newTitleRef = useRef();
    const newIdRef = useRef();

    const [todosRaw, setTodosRaw] = useState([]);
    const [todos, setTodos] = useState([]);
    const [onlyWaiting, setOnlyWaiting] = useState(false);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [numPages, setNumPage] = useState(1);
    const [curPage, setCurPage] = useState(1);

    // Fetch initial todos data
    useEffect(() => {
        setTodosRaw(fetchTodos());
    }, []);

    // Handle filtering and pagination
    useEffect(() => {
        const filteredTodos = onlyWaiting
            ? todosRaw.filter(t => !t.completed)
            : todosRaw;

        setNumPage(Math.ceil(filteredTodos.length / Number(itemPerPage)));

        const startIndex = (curPage - 1) * Number(itemPerPage);
        const endIndex = startIndex + Number(itemPerPage);
        setTodos(filteredTodos.slice(startIndex, endIndex));
    }, [todosRaw, onlyWaiting, itemPerPage, curPage]);

    const deleteClick = (id) => {
        const newTodosRaw = todosRaw.filter(t => t.id !== id);
        setTodosRaw(newTodosRaw);
    };

    const waitingClick = (id) => {
        const foundTodo = todosRaw.find(todo => todo.id === id);
        if (foundTodo) {
            foundTodo.completed = true;
            setTodosRaw([...todosRaw]); // trigger re-render
        }
    };

    // Handle modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveClick = (id, title) => {
        console.log(id, title);
        if (title.trim() !== '') {
            const newTodo =
                setTodosRaw([
                    ...todosRaw,
                    {
                        userId: 1,
                        id: Number(id),
                        title,
                        completed: false
                    }
                ]);
        }
        newIdRef.current.value = '';
        newTitleRef.current.value = '';

        handleClose();
    };

    return (
        <>
            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                value={
                                    todosRaw.reduce(
                                        (prev, todo) =>
                                            todo.id > prev ? todo.id : prev,
                                        -1
                                    ) + 1
                                }
                                disabled={true}
                                ref={newIdRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                placeholder="New todos here!!!"
                                autoFocus
                                ref={newTitleRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            saveClick(
                                todosRaw.reduce(
                                    (prev, todo) =>
                                        todo.id > prev ? todo.id : prev,
                                    -1
                                ) + 1,
                                newTitleRef.current.value
                            )
                        }
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Filter */}
            <div className="container-fluid" style={{ maxWidth: "1200px" }}>
                <Form className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={
                                <>
                                    Show only{" "}
                                    <Button variant="warning" size="sm" className="px-2 py-0">
                                        waiting&nbsp;
                                        <span className="bi bi-clock"></span>
                                    </Button>
                                </>
                            }
                            onChange={(e) => {
                                setOnlyWaiting(e.target.checked);
                                setCurPage(1);
                            }}
                        />
                        <Form.Select
                            aria-label="Items per page"
                            defaultValue={5}
                            className="w-25"
                            onChange={(e) => {
                                setItemPerPage(Number(e.target.value));
                                setCurPage(1);
                            }}
                        >
                            <option value={5}>5 items per page</option>
                            <option value={10}>10 items per page</option>
                            <option value={50}>50 items per page</option>
                            <option value={100}>100 items per page</option>
                        </Form.Select>
                    </div>
                </Form>

                <Table striped bordered hover style={{ tableLayout: "fixed" }}>
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center" style={{ width: "5rem" }}>
                                ID
                            </th>
                            <th>Title</th>
                            <th className="text-end" style={{ width: "12rem" }}>
                                Completed&nbsp;
                                <Button onClick={handleShow}>
                                    <i className="bi bi-plus"></i>
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td className="text-center">
                                    <h5>
                                        <Badge bg="secondary">{todo.id}</Badge>
                                    </h5>
                                </td>
                                <td className="text-truncate">{todo.title}</td>
                                <td className="text-end">
                                    {todo.completed ? (
                                        <Badge bg="success" className="fs-6">
                                            done
                                        </Badge>
                                    ) : (
                                        <Button
                                            variant="warning"
                                            onClick={() => waitingClick(todo.id)}
                                        >
                                            Waiting&nbsp;
                                            <span className="bi bi-clock"></span>
                                        </Button>
                                    )}
                                    &nbsp;
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deleteClick(todo.id);
                                        }}
                                    >
                                        <span className="bi bi-trash3"></span>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="text-center">
                    <Button
                        variant="outline-primary"
                        onClick={() => setCurPage(1)}
                        disabled={curPage === 1}
                    >
                        First
                    </Button>
                    &nbsp;
                    <Button
                        variant="outline-primary"
                        onClick={() => setCurPage((p) => p - 1)}
                        disabled={curPage === 1}
                    >
                        Previous
                    </Button>
                    &nbsp;
                    <span>
                        {curPage}&nbsp;/&nbsp;{numPages}
                    </span>
                    &nbsp;
                    <Button
                        variant="outline-primary"
                        onClick={() => setCurPage((p) => p + 1)}
                        disabled={curPage === numPages}
                    >
                        Next
                    </Button>
                    &nbsp;
                    <Button
                        variant="outline-primary"
                        onClick={() => setCurPage(numPages)}
                        disabled={curPage === numPages}
                    >
                        Last
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Todos;
