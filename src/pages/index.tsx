import Head from "next/head";

import { Header } from "~/components/Header";
import { Display } from "~/components/Display";
import { Grid } from "~/components/Grid";
import { Report } from "~/components/Report";
import { Options } from "~/components/Options";
import { useGridStore, getGameStatus } from "~/store";
import { GAME_STATUS } from "~/utils/types";
import { useEffect } from "react";

export default function Home() {
  const { status, restart } = useGridStore((state) => ({
    status: getGameStatus(state),
    restart: state.restart,
  }));

  // Initial load board
  useEffect(() => {
    restart()
  }, [])

  return (
    <>
      <Head>
        <title>Gaze</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="box-border flex items-center justify-center bg-[var(--bg-color)] font-mono">
        <div className="flex min-h-screen w-full flex-col justify-between p-5 sm:w-2/3">
          <Header />
          <div className="flex flex-col gap-5">
            <Display />
            {status != GAME_STATUS.FINISHED && <Grid />}
            {status == GAME_STATUS.FINISHED && <Report />}
            <Options />
          </div>
          <div className="select-none text-center font-mono text-[var(--sub-color)]">
            Inspired by Schultz Table
          </div>
        </div>
      </main>
    </>
  );
}
