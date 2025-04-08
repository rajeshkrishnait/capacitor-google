import styles from "../styles/QuickActions.module.scss";
import { Sun, DollarSign, Tv, ListMusic } from "lucide-react";

const actions = [
  { label: "Weather", icon: Sun, color: "#FABB05" },       // Yellow
  { label: "Finance", icon: DollarSign, color: "#34A853" }, // Green
  { label: "Entertainment", icon: Tv, color: "#EA4335" },   // Red
  { label: "Sports", icon: ListMusic, color: "#4285F4" },    // Blue
];

const QuickActions = () => {
  return (
    <div className={styles.container}>
      {actions.map((item, idx) => (
        <div className={styles.action} key={idx}>
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: `${item.color}20` }} // faded background
          >
            <item.icon size={20} color={item.color} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
