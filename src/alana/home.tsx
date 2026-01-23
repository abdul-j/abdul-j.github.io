import { useState} from 'react';
import Handwrite from '../handwrite';
import messageSvg from '/assets/alana/message.svg';

function Home() {
    const [finished, setFinished] = useState(false);
    const updateFinished = (status:boolean) => {
        window.addEventListener('click', () => {
            if (status) {
                setFinished(true);
            }
        }, { once: true });
    };
    return (
        <div className="fixed overflow-hidden">
            {!finished && <Handwrite key="memo" duration={5} svgFile={messageSvg} animate={false} width={window.screen.width} height={window.screen.height} delay={0} finished={updateFinished} />}
        </div>
    )
}
export default Home;