import React, { useEffect, useRef, useState } from "react";
import "./Animation.css";

// Default sizes — ปรับได้ตามต้องการ
const FIELD_WIDTH = 850;
const FIELD_HEIGHT = 500;
const BALL_DIAMETER = 150;
const VX = 5;
const VY = 5;

export default function BouncingBall() {
  const ballRef = useRef(null);
  const fieldRef = useRef(null);

  const [running, setRunning] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dir, setDir] = useState({ right: true, down: true });
  const [rotation, setRotation] = useState(0);

  // initialize sizes on mount
  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.style.width = FIELD_WIDTH + "px";
      fieldRef.current.style.height = FIELD_HEIGHT + "px";
    }
    if (ballRef.current) {
      ballRef.current.style.width = BALL_DIAMETER + "px";
      ballRef.current.style.height = BALL_DIAMETER + "px";
    }
  }, []);

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === " ") toggleRun();
      else if (e.key === "0") setStyleNone();
      else if (e.key === "1") setStyleImage('./image/Basketball.png');
      else if (e.key === "2") setStyleImage("./image/football.png");
      else if (e.key === "3") setStyleImage("./image/volleyball.png");
      else if (e.key === "4") setStyleImage("./image/human.jpg");
      else if (e.key === "5") setStyleImage("./image/cartoon.png");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // main loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!running) return;
      setPos((prev) => {
        let { x, y } = prev;
        let goRight = dir.right;
        let goDown = dir.down;
        // x
        if (goRight) {
          x += VX;
          if (x + BALL_DIAMETER > FIELD_WIDTH) {
            x = FIELD_WIDTH - BALL_DIAMETER;
            goRight = false;
            setRotation((r) => r + 180);
          }
        } else {
          x -= VX;
          if (x < 0) {
            x = 0;
            goRight = true;
            setRotation((r) => r + 180);
          }
        }
        // y
        if (goDown) {
          y += VY;
          if (y + BALL_DIAMETER > FIELD_HEIGHT) {
            y = FIELD_HEIGHT - BALL_DIAMETER;
            goDown = false;
            setRotation((r) => r + 180);
          }
        } else {
          y -= VY;
          if (y < 0) {
            y = 0;
            goDown = true;
            setRotation((r) => r + 180);
          }
        }
        setDir({ right: goRight, down: goDown });
        // smooth spin per frame
        setRotation((r) => r + 10);
        return { x, y };
      });
    }, 25);

    return () => clearInterval(interval);
  }, [running, dir]);

  // style helpers (update ball DOM directly for background-image / color)
  const setStyleImage = (url) => {
    if (!ballRef.current) return;
    ballRef.current.style.backgroundImage = `url('${url}')`;
    ballRef.current.style.backgroundColor = "transparent";
    ballRef.current.style.border = "none";
  };
  const setStyleNone = () => {
    if (!ballRef.current) return;
    ballRef.current.style.backgroundImage = "none";
    ballRef.current.style.backgroundColor = "purple";
    ballRef.current.style.border = "1px solid black";
  };

  const toggleRun = () => setRunning((r) => !r);

  return (
    <div className="anim-container">
      <div id="field" className="anim-field" ref={fieldRef}>
        <div
          id="ball"
          className="anim-ball"
          ref={ballRef}
          style={{ left: pos.x + "px", top: pos.y + "px", transform: `rotate(${rotation}deg)` }}
        />
      </div>

      <div className="anim-control d-flex justify-content-between">
        <button id="run" className={`btn ${running ? "btn-warning" : "btn-success"}`} onClick={toggleRun}>
          <span className={`bi ${running ? "bi-pause-circle" : "bi-play-fill"}`} /> {running ? "Pause" : "Run"}
        </button>

        <div>
          <button className="btn btn-outline-info" onClick={setStyleNone}>
            <i className="bi bi-brilliance" />&nbsp;NONE
          </button>
          <button className="btn btn-danger" onClick={() => setStyleImage("/image/Basketball.png")}>
            BASKETBALL
          </button>
          <button className="btn btn-danger" onClick={() => setStyleImage("/image/football.png")}>
            FOOTBALL
          </button>
          <button className="btn btn-danger" onClick={() => setStyleImage("/image/volleyball.png")}>
            VOLEYBALL
          </button>
          <button className="btn btn-danger" onClick={() => setStyleImage("/image/human.jpg")}>
            <i className="bi bi-person-fill" />&nbsp;HUMAN
          </button>
          <button className="btn btn-danger" onClick={() => setStyleImage("/image/cartoon.png")}>
            CARTOON
          </button>
        </div>
      </div>
    </div>
  );
}
