import { useRecoilValue, useRecoilState } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import { useEffect } from "react";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

interface MaterialIconProps {
  name: string;
}

export function MaterialIcon({ name }: MaterialIconProps) {
  return (
    <div className="material-icons-round" style={{ fontSize: "15px" }}>
      {name}
    </div>
  );
}

const Container = styled.div`
  padding: 0 2rem;
  max-width: 30rem;
  margin: 0 auto;

  hr {
    margin: 2rem auto;
  }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const Header = styled.header`
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 3rem;
  gap: 0.6rem;
`;

const GridItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 0.7rem;
  overflow-wrap: anywhere;
  overflow: hidden;

  button {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.7rem;
    background-color: transparent;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.cardColor};
    transition: background-color 0.3s;
  }

  &:hover button {
    background-color: ${(props) => props.theme.activeCardColor};
  }

  button[disabled] {
    border: 0.2rem solid ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.accentFadedColor};
    color: ${(props) => props.theme.accentColor};
    font-weight: 700;
  }

  &:last-child button {
    color: ${(props) => props.theme.accentColor};
    font-size: 1.6rem;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const onClick = (category: string) => {
    setCategory(category);
  };

  const addCategory = () => {
    const newCategory = prompt("새로운 카테고리의 이름이 무엇인가요?", "");

    if (newCategory) {
      if (categories.includes(newCategory)) {
        alert("같은 이름의 카테고리가 이미 있어서 추가할 수 없습니다.");
        return;
      }

      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
    // localStorage.clear();
  }, [categories]);

  return (
    <>
      <Container>
        <Header>
          <Title>To Do</Title>
        </Header>
        <GridContainer>
          {categories.map((availableCategory) => (
            <GridItem key={availableCategory}>
              <button
                onClick={() => onClick(availableCategory)}
                disabled={availableCategory === category}
              >
                {availableCategory}
              </button>
            </GridItem>
          ))}
          <GridItem>
            <button onClick={addCategory}>
              <MaterialIcon name="카테고리 추가" />
            </button>
          </GridItem>
        </GridContainer>
        <hr />
        <CreateToDo />
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Container>
    </>
  );
}

export default ToDoList;
