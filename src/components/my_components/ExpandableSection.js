import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as ArrowDown } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ArrowUpIcon } from "feather-icons/dist/icons/chevron-right.svg";

const Toggle = tw.dt`flex justify-between items-center h-12 w-full bg-gray-200 mt-6 border-2 rounded-xl`;
const Title = tw.span`text-2xl lg:text-2xl font-semibold pl-4`
const Content = tw.div`border`
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 p-2 bg-gray-200`}
  svg {
    ${tw`w-6 h-6`}
  }
`;

const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

export default (props) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    return (
        <>
            <Toggle onClick={toggle}>
                <Title>FILTROS</Title><PrevButton><ArrowUpIcon></ArrowUpIcon></PrevButton>
            </Toggle>
            <Content>{open && props.children}</Content>
        </>
    );
};