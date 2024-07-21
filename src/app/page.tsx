import { Button } from "@/components/ui/button";
import { SingleDatePicker } from "@/components/ui/date-picker/single-date-picker";

const Home = () => {
  return (
    <main>
      <Button variant="secondary">Click me</Button>
      <Button>Click me</Button>
      <Button variant="destructive">Click me</Button>
      <SingleDatePicker />
    </main>
  );
};

export default Home;
