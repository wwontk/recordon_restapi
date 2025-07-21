import styled from "styled-components";

const CommonLettering = () => {
  return (
    <Container>
      <div>
        <p>in prologue</p>
        <button>파일 업로드</button>
        <div>
          <input type="text" disabled />
          <button></button>
          <button></button>
        </div>
      </div>
      <div>
        <p>out prologue</p>
        <button>파일 업로드</button>
        <div>
          <input type="text" disabled />
          <button></button>
          <button></button>
        </div>
      </div>
      <div>
        <p>in epilogue1</p>
        <button>파일 업로드</button>
        <div>
          <input type="text" disabled />
          <button></button>
          <button></button>
        </div>
      </div>
      <div>
        <p>in epilogue2</p>
        <button>파일 업로드</button>
        <div>
          <input type="text" disabled />
          <button></button>
          <button></button>
        </div>
      </div>
      <div>
        <p>out epilogue1</p>
        <button>파일 업로드</button>
        <div>
          <input type="text" disabled />
          <button></button>
          <button></button>
        </div>
      </div>
    </Container>
  );
};

export default CommonLettering;

const Container = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > p {
      font-size: 14px;
    }

    & > button {
      width: 90px;
      height: 24px;
      background-color: #fff;
      border: 1px solid #66b2c1;
      border-radius: 3px;
      color: #66b2c1;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #66b2c1;
        color: #fff;
      }
    }

    & > div {
      display: flex;
      align-items: center;
      gap: 4px;

      & > input {
        width: 200px;
        height: 24px;
        font-size: 14px;
      }

      & > button {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
