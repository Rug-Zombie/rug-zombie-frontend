import React from 'react'
import './Home.Styles.css'
import TopMenu from '../../components/TopMenu'

interface HomeProps {
  modalObj: {modal: boolean, setModal: any};
}

const Home: React.FC<HomeProps> = ({ modalObj }) => {


  return (
    <>
      <TopMenu>
        <div id='home-section-1'>
          hello
        </div>
      </TopMenu>
    </>
  )
}

export default Home
