import styled from "styled-components";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { MaterialIcon } from "./ToDoList";

const CreateToDoForm = styled.form`
	display: flex;
	position: relative;
	align-items: center;
	width: 100%;
	height: 3rem;
	margin: 0 auto;
	margin-bottom: 1rem;
	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	background-color: ${(props) => props.theme.cardColor};
	transition: background-color 0.3s, box-shadow 0.3s;

	& > * {
		height: 100%;
	}

	input {
		width: 100%;
		border: none;
		border-radius: 0.7rem;
		background-color: transparent;
		padding-left: 0.9rem;
		font-size: 0.9rem;
		color: ${(props) => props.theme.textColor};
	}

	&:hover {
		box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
	}

	&:focus-within {
		box-shadow: 0 0.1rem 0.5rem rgba(10, 10, 10, 0.2);
	}

	button {
		position: absolute;
		right: 0;
		width: 3rem;
		background-color: transparent;
		border: none;
		border-radius: 0.7rem;
		font-size: 1.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.accentColor};
	}

	input:placeholder-shown + button {
		display: none;
	}

	input:focus,
	button:focus {
		outline: 0.2rem solid ${(props) => props.theme.accentColor};
	}
`;

interface FormDataInterface {
	toDo: string;
}

function CreateToDo() {
	const { register, handleSubmit, setValue } = useForm<FormDataInterface>();
	const [toDos, setToDos] = useRecoilState(toDoState);
	const category = useRecoilValue(categoryState);

	const onValid = ({ toDo }: FormDataInterface) => {
		setValue("toDo", "");
		setToDos((current) => [{ text: toDo, category, id: Date.now() }, ...current]);
	};

	useEffect(() => {
		localStorage.setItem("toDos", JSON.stringify(toDos));
	}, [toDos]);

	return (
		<CreateToDoForm onSubmit={handleSubmit(onValid)}>
			<input
				{...register("toDo", { required: "할 일을 입력해야 합니다." })}
				placeholder={`${category} 리스트에 새 할 일을 추가해보세요`}
			/>
			<button>
				<MaterialIcon name="추가" />
			</button>
		</CreateToDoForm>
	);
}

export default CreateToDo;