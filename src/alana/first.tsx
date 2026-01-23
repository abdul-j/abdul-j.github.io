import Welcome from ',/welcome';

function WelcomeModal() {
  const { isFirstVisit, markAsSeen, ready } = Welcome();

  if (!ready || !isFirstVisit) return null;

  return (
    <div className="modal">
      <h2>Welcome</h2>
      <p>This message appears once.</p>
      <button onClick={markAsSeen}>Got it</button>
    </div>
  );
}

export default WelcomeModal;
