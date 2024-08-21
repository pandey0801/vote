import { render, screen } from "@testing-library/react";
import ForgetPas from "./ForgetPas";

describe('name',()=>{

  test("renders Send Password Reset Email button", () => {
    render(<ForgetPas />);
    const button = screen.getByText("Send Password Reset Email");
    expect(button).toBeInTheDocument();
  }); 

})