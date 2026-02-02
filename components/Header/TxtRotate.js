import { useEffect, useRef, useState } from "react";

export default function TxtRotate({
  toRotate = [],
  period = 2000,
  className = "",
  cursorColor = "#666",
  cursorWidthEm = 0.08,
  blinkSpeedMs = 700,
}) {
  const [renderTxt, setRenderTxt] = useState("");

  const loopNumRef = useRef(0);
  const isDeletingRef = useRef(false);
  const txtRef = useRef("");          // ✅ 핵심: 현재 txt를 ref로 관리
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(toRotate) || toRotate.length === 0) return;

    const tick = () => {
      const i = loopNumRef.current % toRotate.length;
      const fullTxt = toRotate[i];

      // 다음 txt 계산
      const nextTxt = isDeletingRef.current
        ? fullTxt.substring(0, txtRef.current.length - 1)
        : fullTxt.substring(0, txtRef.current.length + 1);

      txtRef.current = nextTxt;
      setRenderTxt(nextTxt);

      let delta = 300 - Math.random() * 100;
      if (isDeletingRef.current) delta /= 2;

      if (!isDeletingRef.current && nextTxt === fullTxt) {
        // 단어 다 쳤으면 잠깐 멈추고 지우기 시작
        delta = 1200;
        isDeletingRef.current = true;
      } else if (isDeletingRef.current && nextTxt === "") {
        // 다 지웠으면 다음 단어로
        isDeletingRef.current = false;
        loopNumRef.current += 1;
        delta = 800;
      }

      timeoutRef.current = setTimeout(tick, delta);
    };

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [toRotate, period]);

  return (
    <span className={`txt-rotate text-blue-100 font-extrabold ${className}`}>
      <span className="wrap border-r-[2.5px] border-[#666] pr-0.5">{" "}{renderTxt}</span>
    </span>
  );
}
