import { DemoBanner, ErrorAlert, Footer, Header, Loading, SkipLink, StorageBlocked } from 'components'
import { useQuizApp } from 'hooks/useQuizApp'
import { Gallery, Leaderboard, Quiz, Result, Welcome } from 'pages'
import styles from './App.module.css'

export default function App() {
  const {
    lang,
    texts,
    game,
    name,
    choice,
    busy,
    error,
    storageOk,
    showBoard,
    showGallery,
    rows,
    restore,
    handleLanguageChange,
    handleGameAction,
    handleShowBoard,
    handleHideBoard,
    handleShowGallery,
    handleHideGallery,
    handleChoice,
    handleNameChange
  } = useQuizApp()

  function renderMain() {
    if (busy && !game && !showBoard) {
      return <Loading text={texts.loading} />
    }

    if (showGallery) {
      return (
        <Gallery
          texts={texts}
          backLabel={showBoard ? texts.galleryBack : texts.back}
          onBack={handleHideGallery}
        />
      )
    }

    if (showBoard) {
      return (
        <Leaderboard
          texts={texts}
          busy={busy}
          rows={rows}
          total={game?.total ?? 18}
          onBack={handleHideBoard}
          onOpenGallery={handleShowGallery}
        />
      )
    }

    if (!game) {
      return (
        <Welcome
          texts={texts}
          lang={lang}
          name={name}
          busy={busy}
          storageOk={storageOk}
          onNameChange={handleNameChange}
          onStart={(nextName) => void handleGameAction({ action: 'start', name: nextName })}
        />
      )
    }

    if (game.done) {
      return (
        <Result
          texts={texts}
          lang={lang}
          game={game}
          onViewBoard={() => void handleShowBoard()}
          onOpenGallery={handleShowGallery}
        />
      )
    }

    return (
      <Quiz
        texts={texts}
        lang={lang}
        game={game}
        choice={choice}
        busy={busy}
        onChoice={handleChoice}
        onAnswer={(nextChoice) =>
          void handleGameAction({ action: 'answer', question: game.cursor, choice: nextChoice })
        }
        onNext={() => void handleGameAction({ action: 'next', question: game.cursor })}
      />
    )
  }

  return (
    <div className={styles.root}>
      <SkipLink label={texts.skip} />
      <DemoBanner text={texts.demo} />
      <div className={styles.site}>
        <Header
          lang={lang}
          homeLabel={texts.home}
          languageLabel={texts.language}
          onLanguageChange={handleLanguageChange}
        />
        <main id='main-content' className={styles.main} tabIndex={-1}>
          <ErrorAlert
            message={texts.error}
            retryLabel={texts.retry}
            error={error}
            onRetryLoad={() => void restore()}
            onRetryBoard={() => void handleShowBoard()}
          />
          {!storageOk && <StorageBlocked message={texts.blocked} />}
          {renderMain()}
        </main>
        <Footer
          together={texts.together}
          established={texts.established}
          editionDate={texts.editionDate}
          privacy={texts.privacy}
          creditsParents={texts.creditsParents}
          creditsSite={texts.creditsSite}
        />
      </div>
    </div>
  )
}
