import styled, { css } from "styled-components";
import { Modal } from "antd";
export const StyledCodeDesigner = styled.div`
  
  padding-top: 115.5%;
  width: 100%;
  position: relative;
  text-align: center;
  

  .container {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
  }
  .code-container {
    padding: 10px;
    border: 1px dashed rgba(0, 0, 0, 0);
  }
  .code-container:hover {
    background-color: rgba(200, 200, 200, 0.5);
    border: 1px dashed #f8f8f8;
  }

  .code-container.hover .handle {
    opacity: 1;
    cursor: move;
    background-color: #e6feff;
  }

  .github-picker {
    background-color:#e6feff !important;
  }

  .handle {
    display: flex;
    align-items: center;
    padding: 4px;
    opacity: 0;
    margin-bottom: 8px;
  }

  .handle.initial {
    background-color: #e6feff;
  }

  .initial.code-container {
    background-color: rgba(200, 200, 200, 0.5);
    border: 1px dashed #f8f8f8;
  }
  .initial.handle {
    opacity: 1;
    transition: opacity 2s;
  }
`;
