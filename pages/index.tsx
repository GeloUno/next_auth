import { Fragment } from 'react'
import LayoutPage from '../layout/layout';
import styles from '../styles/Home.module.css'
import StartingPage from '../components/starting-page/starting-page';

export default function Home() {
  return (
    <Fragment>
      <LayoutPage >
        <StartingPage />
      </LayoutPage>
    </Fragment>
  )
}
