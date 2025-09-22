import DotGrid from "../../components/shared/DotGrid/DotGrid";
import styles from "./Background.module.css";

function Background() {
    return (
        <div className={styles["Background"]}>
            <DotGrid
                dotSize={1}
                gap={15}
                baseColor="#5227FF"
                activeColor="#5227FF"
                proximity={120}
                shockRadius={250}
                shockStrength={5}
                resistance={750}
                returnDuration={1.5}
            />
        </div>
    );
}
export default Background;
