import { newtonsCradle } from "ldrs";

export default function Test() {
  newtonsCradle.register();
  return (
    <div className="loading">
      <l-newtons-cradle size="78" speed="1.4" color="purple"></l-newtons-cradle>
    </div>
  );
}
