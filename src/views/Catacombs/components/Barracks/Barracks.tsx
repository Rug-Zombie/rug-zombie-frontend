import React, {useEffect, useState} from 'react'
import {Flex, useMatchBreakpoints} from "@catacombs-libs/uikit";
import styled from "styled-components";
import Menu from '../../../../components/Catacombs/Menu'
import Page from '../../../../components/layout/Page'
import * as get from "../../../../redux/get";
import Table from "./components/Table";
import CatacombsBackgroundDesktopSVG from "../../../../images/CatacombsMain-1920x1080px.svg";
import CatacombsBackgroundMobileSVG from "../../../../images/CatacombsMain-414x720px.svg";
import {barracks, initializeBarrackData} from "../../../../redux/fetch";
import {account} from "../../../../redux/get";

const StyledDiv = styled.div`
  text-align: center;
  position: relative;
  color: white;
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  text-align: center;
  position: absolute;
  top: 15%;
  width: 100%;
  @media (max-width: 479px) {
    height: 40%;
    top: 2%;
    left: 5%;
  }
`

const Barracks: React.FC = () => {

    const { isLg, isXl } = useMatchBreakpoints()
    const isDesktop = isLg || isXl

    const [updateBarrackInfo, setUpdateBarrackInfo] = useState(0);
    const [updateBarrackUserInfo, setUpdateBarrackUserInfo] = useState(0);

    const wallet = account();

    useEffect(() => {
        if(wallet) {
            if(updateBarrackUserInfo === 0) {
                initializeBarrackData({update: updateBarrackUserInfo, setUpdate: setUpdateBarrackUserInfo});
            }
        }
        initializeBarrackData({update: updateBarrackInfo, setUpdate: setUpdateBarrackInfo});
    }, [ wallet, updateBarrackInfo, updateBarrackUserInfo ]);

    const updateResult = (id: number) => {
        barracks(id);
    };

    return (
        <Menu>
            <StyledDiv>
                {isDesktop ? <img src={CatacombsBackgroundDesktopSVG} alt='catacombs-rug-zombie' /> :
                    <img src={CatacombsBackgroundMobileSVG} alt='catacombs-rug-zombie' />
                }
                <Flex justifyContent='center'>
                    <Container>
                        <Page >
                            <div>
                                {get.barracks().map((b) => {
                                    return <Table id={b.id} key={b.id} updateResult={updateResult} />
                                })}
                            </div>
                        </Page>
                    </Container>
                </Flex>
            </StyledDiv>
        </Menu>
    )
}

export default Barracks
