import styled from "styled-components";
import { categoriesState, ToDoInterface, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const ToDoComponent = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-radius: 0.7rem;
  padding: 1rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.cardColor};
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
  }

  &:last-child {
    margin-bottom: 8rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;

  button {
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.textColor};
    font-weight: 700;
    border: none;
    padding: 0.3rem 0.5rem;
    border-radius: 0.3rem;
    transition: background-color 0.3s;
    max-width: 10rem;
    overflow: hidden;
    height: 1.7rem;
    text-overflow: ellipsis;
  }

  button:last-child {
    background-color: #ffe0e6;
    color: #f3214f;
  }

  button[disabled] {
    opacity: 0.4;
  }

  button:not(:last-child):not(:disabled):hover {
    background-color: ${(props) => props.theme.hoverButtonColor};
  }
`;

function ToDo({ text, category, id }: ToDoInterface) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

  const changeCategory = (selectedCategory: string) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);
      const newToDo = { text, category: selectedCategory, id };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <>
      <ToDoComponent>
        <span>{text}</span>
        <ButtonsContainer>
          {Object.values(categories).map((availableCategory) => (
            <button
              disabled={availableCategory === category}
              key={availableCategory}
              onClick={() => changeCategory(availableCategory)}
            >
              {availableCategory}
            </button>
          ))}
        </ButtonsContainer>
      </ToDoComponent>
    </>
  );
}

export default ToDo;
