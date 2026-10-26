"use client";

import { useEffect, useRef, useState } from "react";
import { HeartHandshake, Laptop, Sparkle } from "lucide-react";
import styles from "@/app/page.module.css";
import { dynaPuff, nunito } from "@/app/fonts";
import { hero, site } from "@/data";
import { useCharms, useFound } from "@/components/Charms";
import { prefersReducedMotion, sparkle } from "@/lib/fx";
import { drawScreen, SCREEN_H, SCREEN_W } from "@/lib/laptopScreen";

type Three = typeof import("three");
type StageApi = { toggleLid: () => void; nextScreen: () => void; sendLove: () => void };
type Callbacks = { onLid: (open: boolean) => void; onHeart: () => void; heartFound: () => boolean };

/* ---------- 3D: rose-gold laptop on a cloud ---------- */
function initScene(THREE: Three, stage: HTMLDivElement, canvas: HTMLCanvasElement, cb: Callbacks) {
  const reduce = prefersReducedMotion();
  const fine = window.matchMedia("(pointer: fine)").matches;

  // Match the original r128 look: hex colours are used as-is rather than converted from sRGB.
  THREE.ColorManagement.enabled = false;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, fine ? 1.75 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 2.2, 8.6);
  camera.lookAt(0, 0.3, 0);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const es = new THREE.Scene();
  es.background = new THREE.Color(0xf6d6de);
  const panel = (w: number, h: number, c: number, k: number, p: [number, number, number]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(...p); m.lookAt(0, 0, 0); es.add(m);
  };
  panel(8, 3, 0xffffff, 2.4, [0, 7, 1]); panel(2.5, 7, 0xffd0dc, 1.6, [-7, 1.5, 3]); panel(2.5, 7, 0xd8ccff, 1.5, [7, 1, -2]); panel(10, 2, 0xfff0c8, 1.2, [0, 0.5, -7]);
  const envMap = pmrem.fromScene(es, 0.04).texture;
  scene.environment = envMap;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xffd6e0, 0.6 * Math.PI));
  const key = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI);
  key.position.set(3, 6, 4); scene.add(key);

  const shape = (w: number, h: number, r: number) => {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  const slab = (w: number, h: number, d: number, r: number, b: number) => {
    const g = new THREE.ExtrudeGeometry(shape(w - 2 * b, h - 2 * b, r), { depth: d, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 5, curveSegments: 14 });
    g.center();
    return g;
  };
  const heartShape = () => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.25); s.bezierCurveTo(0, 0.3, -0.05, 0.45, -0.25, 0.45); s.bezierCurveTo(-0.55, 0.45, -0.55, 0.1, -0.55, 0.1);
    s.bezierCurveTo(-0.55, -0.1, -0.35, -0.32, 0, -0.5); s.bezierCurveTo(0.35, -0.32, 0.55, -0.1, 0.55, 0.1);
    s.bezierCurveTo(0.55, 0.1, 0.55, 0.45, 0.25, 0.45); s.bezierCurveTo(0.1, 0.45, 0, 0.3, 0, 0.25);
    return s;
  };
  const heartGeo = new THREE.ExtrudeGeometry(heartShape(), { depth: 0.18, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.07, bevelSegments: 5, curveSegments: 16 });
  heartGeo.center();

  const rose = new THREE.MeshPhysicalMaterial({ color: 0xe9b7a9, metalness: 0.9, roughness: 0.26, clearcoat: 0.6, clearcoatRoughness: 0.2 });
  const keyMat = new THREE.MeshStandardMaterial({ color: 0xfff3f6, roughness: 0.6 });
  const rig = new THREE.Group(); scene.add(rig);
  const laptop = new THREE.Group(); laptop.position.set(0, -0.12, 0.1); laptop.scale.setScalar(0.92); rig.add(laptop);
  const base = new THREE.Mesh(slab(3.3, 2.25, 0.06, 0.26, 0.035), rose); base.rotation.x = -Math.PI / 2; base.position.y = 0.065; laptop.add(base);
  const well = new THREE.Mesh(new THREE.ShapeGeometry(shape(2.86, 1.0, 0.12)), new THREE.MeshStandardMaterial({ color: 0xc98f82, roughness: 0.6, metalness: 0.4 }));
  well.rotation.x = -Math.PI / 2; well.position.set(0, 0.1312, -0.36); laptop.add(well);
  const cols = 13, rows = 5;
  const keys = new THREE.InstancedMesh(slab(0.165, 0.145, 0.012, 0.05, 0.008), keyMat, cols * rows);
  const dm = new THREE.Object3D(), kc = new THREE.Color();
  let ki = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    dm.position.set((c - (cols - 1) / 2) * 0.205, 0.142, -0.36 + (r - (rows - 1) / 2) * 0.182);
    dm.rotation.set(-Math.PI / 2, 0, 0); dm.updateMatrix();
    keys.setMatrixAt(ki, dm.matrix);
    keys.setColorAt(ki, kc.set([0xfff3f6, 0xfff3f6, 0xfff3f6, 0xffd0dc, 0xe6deff][(r * 7 + c * 3) % 5]));
    ki++;
  }
  laptop.add(keys);
  const pad = new THREE.Mesh(new THREE.ShapeGeometry(shape(1.15, 0.64, 0.14)), new THREE.MeshPhysicalMaterial({ color: 0xe2ac9e, metalness: 0.8, roughness: 0.45 }));
  pad.rotation.x = -Math.PI / 2; pad.position.set(0, 0.1315, 0.62); laptop.add(pad);
  const lid = new THREE.Group(); lid.position.set(0, 0.17, -1.07); laptop.add(lid);
  const lidBody = new THREE.Mesh(slab(3.3, 2.16, 0.03, 0.26, 0.022), rose); lidBody.position.set(0, 1.08, -0.037); lid.add(lidBody);
  const bezel = new THREE.Mesh(new THREE.ShapeGeometry(shape(3.2, 2.06, 0.22)), new THREE.MeshPhysicalMaterial({ color: 0xfff6f8, roughness: 0.3, clearcoat: 1 }));
  bezel.position.set(0, 1.08, 0.0005); lid.add(bezel);

  const sc = document.createElement("canvas");
  sc.width = SCREEN_W; sc.height = SCREEN_H;
  const sctx = sc.getContext("2d")!;
  const tex = new THREE.CanvasTexture(sc);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.96, 1.85), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
  screen.position.set(0, 1.1, 0.002); lid.add(screen);
  const logo = new THREE.Mesh(heartGeo, new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.1 }));
  logo.scale.setScalar(0.32); logo.position.set(0, 1.08, -0.09); logo.rotation.y = Math.PI; lid.add(logo);

  // cloud
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, emissive: 0xffd6e0, emissiveIntensity: 0.28 });
  const sph = new THREE.SphereGeometry(1, 32, 24), cloud = new THREE.Group(); rig.add(cloud);
  ([[0, -0.62, 0, 1.45], [-1.45, -0.7, 0.25, 1.0], [1.5, -0.7, -0.05, 1.05], [-0.7, -0.82, 1.0, 0.85], [0.85, -0.82, 1.0, 0.9], [0, -0.75, -1.0, 0.95], [-2.15, -0.82, -0.35, 0.62], [2.2, -0.85, 0.55, 0.6], [0.2, -0.95, 1.5, 0.55]] as const)
    .forEach(([x, y, z, s]) => { const m = new THREE.Mesh(sph, cloudMat); m.position.set(x, y, z); m.scale.set(s, s * 0.55, s); cloud.add(m); });

  // orbiting hearts
  const hMats = [0xff7aa0, 0xb9a8ff, 0xffd66b, 0x9fe3c9, 0xffb3c8].map((c) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1 }));
  const orbit = Array.from({ length: 5 }, (_, i) => {
    const m = new THREE.Mesh(heartGeo, hMats[i]);
    m.scale.setScalar(0.28 + (i % 2) * 0.08); rig.add(m);
    return { m, a: (i / 5) * Math.PI * 2, r: 2.5 + (i % 2) * 0.35, y: 0.4 + (i % 3) * 0.55, s: 0.25 + i * 0.03 };
  });
  // burst pool
  const burst = Array.from({ length: 16 }, (_, i) => {
    const m = new THREE.Mesh(heartGeo, hMats[i % 5]);
    m.visible = false; scene.add(m);
    return { m, v: new THREE.Vector3(), life: 0 };
  });

  const OPEN = -0.24, CLOSED = Math.PI / 2 - 0.015;
  let lidOpen = true, lidA = reduce ? OPEN : CLOSED, lidV = 0, lidT = lidA, hopY = 0, hopV = 0;
  let rotY = -0.45, rotX = 0, velY = 0, drag = false, lastX = 0, lastY = 0, downX = 0, downY = 0, px = 0, py = 0, tpx = 0, tpy = 0;
  let screenState = 0, screenT0 = performance.now();

  const screenOpts = { name: site.fullName, tagline: hero.screenTagline, display: dynaPuff.style.fontFamily, body: nunito.style.fontFamily, reduce };
  const paint = (now: number) => {
    drawScreen(sctx, screenState, now, screenT0, { ...screenOpts, heartFound: cb.heartFound() });
    tex.needsUpdate = true;
  };

  const sendLove = () => {
    burst.forEach((b) => {
      b.m.visible = true;
      b.m.position.set((Math.random() - 0.5) * 0.8, 0.8, (Math.random() - 0.5) * 0.4);
      b.v.set((Math.random() - 0.5) * 0.09, 0.06 + Math.random() * 0.06, (Math.random() - 0.5) * 0.05);
      b.life = 1; b.m.scale.setScalar(0.12 + Math.random() * 0.1);
    });
    hopV = 0.09;
  };
  const timers: number[] = [];
  const nextScreen = () => {
    screenState = (screenState + 1) % 3;
    screenT0 = performance.now();
    if (screenState === 2) timers.push(window.setTimeout(cb.onHeart, 500));
  };
  const setLid = (open: boolean) => { lidOpen = open; lidT = open ? OPEN : CLOSED; cb.onLid(open); };
  timers.push(window.setTimeout(() => setLid(true), reduce ? 0 : 800));

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const hit = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const h = ray.intersectObjects([screen, bezel, lidBody, base, keys, ...cloud.children], false)[0];
    return h ? h.object : null;
  };
  const ac = new AbortController(), on = { signal: ac.signal };
  canvas.addEventListener("pointerdown", (e) => {
    drag = true; lastX = downX = e.clientX; lastY = downY = e.clientY; velY = 0;
    canvas.setPointerCapture(e.pointerId); canvas.classList.add(styles.grabbing);
  }, on);
  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    tpx = (e.clientX - r.left) / r.width - 0.5; tpy = (e.clientY - r.top) / r.height - 0.5;
    if (drag) {
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      velY = Math.max(-0.09, Math.min(0.09, dx * 0.0075)); rotY += velY;
      rotX = Math.max(-0.3, Math.min(0.4, rotX + dy * 0.004));
    } else if (fine) canvas.classList.toggle(styles.pointing, !!hit(e));
  }, on);
  const end = (e: PointerEvent) => {
    if (!drag) return;
    drag = false; canvas.classList.remove(styles.grabbing);
    if (e.type === "pointerup" && Math.hypot(e.clientX - downX, e.clientY - downY) < 6) {
      const o = hit(e);
      if (!lidOpen && (o === lidBody || o === base || o === keys)) setLid(true);
      else if (lidOpen && (o === screen || o === bezel)) nextScreen();
      else if (o && cloud.children.includes(o)) { hopV = 0.07; sparkle(e.clientX, e.clientY, 10, 1.5); }
      else if (o === base || o === keys) sendLove();
    }
  };
  canvas.addEventListener("pointerup", end, on);
  canvas.addEventListener("pointercancel", end, on);
  canvas.addEventListener("pointerleave", () => { tpx = tpy = 0; }, on);

  const resize = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = 8.6 * Math.max(1, 1.05 / camera.aspect);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize); ro.observe(stage); resize();

  let visible = true, raf = 0, last = performance.now(), fN = 0, started = false;
  const frame = (now: number) => {
    raf = visible ? requestAnimationFrame(frame) : 0;
    const k = Math.min(3, (now - last) / 16.67); last = now;
    if (!drag) { velY *= Math.pow(0.93, k); rotY += velY * k; rotX += -rotX * (1 - Math.pow(0.95, k)); }
    px += (tpx - px) * 0.05 * k; py += (tpy - py) * 0.05 * k;
    hopV -= 0.006 * k; hopY += hopV * k;
    if (hopY < 0) { hopY = 0; hopV = Math.abs(hopV) > 0.02 ? -hopV * 0.35 : 0; }
    rig.rotation.set(rotX + (reduce ? 0 : py * 0.1), rotY + (reduce ? 0 : px * 0.28), 0);
    rig.position.y = reduce ? 0 : Math.sin(now * 0.001) * 0.08;
    laptop.position.y = -0.12 + hopY;
    lidV += (lidT - lidA) * 0.055 * k; lidV *= Math.pow(0.8, k); lidA += lidV * k; lid.rotation.x = lidA;
    const tt = reduce ? 0 : now / 1000;
    orbit.forEach((o, i) => {
      const a = o.a + tt * o.s;
      o.m.position.set(Math.cos(a) * o.r, o.y + Math.sin(tt * 1.3 + i) * 0.15, Math.sin(a) * o.r * 0.7);
      o.m.rotation.y = tt * 1.2 + i;
    });
    burst.forEach((b) => {
      if (b.life <= 0) return;
      b.life -= 0.012 * k; b.v.y -= 0.0015 * k;
      b.m.position.addScaledVector(b.v, k); b.m.rotation.y += 0.08 * k; b.m.scale.multiplyScalar(Math.pow(0.995, k));
      if (b.life <= 0) b.m.visible = false;
    });
    if ((fN++ & 1) === 0 && lidA < 1.2) paint(now);
    renderer.render(scene, camera);
  };
  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible && started && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  });
  io.observe(stage);

  const fontsReady = Promise.all([
    document.fonts.load(`600 92px ${screenOpts.display}`),
    document.fonts.load(`700 34px ${screenOpts.body}`),
  ]).catch(() => {});

  return {
    ready: fontsReady.then(() => {
      if (ac.signal.aborted) return;
      started = true;
      paint(performance.now());
      if (!raf) raf = requestAnimationFrame(frame);
    }),
    api: { toggleLid: () => setLid(!lidOpen), nextScreen: () => (lidOpen ? nextScreen() : setLid(true)), sendLove } satisfies StageApi,
    dispose: () => {
      ac.abort();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      ro.disconnect(); io.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      es.traverse((o) => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); o.material.dispose(); } });
      tex.dispose(); envMap.dispose(); pmrem.dispose(); renderer.dispose();
    },
  };
}

export default function LaptopStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<StageApi | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lidOpen, setLidOpen] = useState(true);

  const { grant } = useCharms();
  const found = useFound();
  const cb = useRef<Callbacks>(null!);
  useEffect(() => {
    cb.current = {
      onLid: setLidOpen,
      onHeart: () => grant("heart", stageRef.current),
      heartFound: () => found.includes("heart"),
    };
  }, [grant, found]);

  useEffect(() => {
    let dispose: (() => void) | null = null, cancelled = false;
    const callbacks: Callbacks = {
      onLid: (open) => cb.current.onLid(open),
      onHeart: () => cb.current.onHeart(),
      heartFound: () => cb.current.heartFound(),
    };
    import("three")
      .then((THREE) => {
        if (cancelled || !stageRef.current || !canvasRef.current) return;
        let s;
        try {
          s = initScene(THREE, stageRef.current, canvasRef.current, callbacks);
        } catch {
          setError("WebGL is turned off in this browser, so the 3D laptop is hidden.");
          return;
        }
        dispose = s.dispose;
        api.current = s.api;
        s.ready.then(() => !cancelled && setReady(true));
      })
      .catch(() => setError("The 3D laptop could not load, but the charm hunt still works."));
    return () => {
      cancelled = true;
      api.current = null;
      dispose?.();
    };
  }, []);

  return (
    <div className={styles.stage} ref={stageRef}>
      {error ? (
        <div className={styles.fallback}>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className={`${styles.loader} ${ready ? styles.gone : ""}`}>
            <i />
          </div>
          <canvas
            ref={canvasRef}
            className={`${styles.canvas} ${ready ? styles.ready : ""}`}
            role="img"
            aria-label="A rose-gold 3D laptop floating on a cloud. Drag to spin it; tap the screen to change what it shows."
          />
          <div className={styles.controls}>
            <span className={styles.hint}>Spin me, tap my screen</span>
            <button className={styles.iconbtn} type="button" aria-label="Send hearts" onClick={() => api.current?.sendLove()}>
              <HeartHandshake />
            </button>
            <button className={styles.iconbtn} type="button" aria-label="Show the next screen" onClick={() => api.current?.nextScreen()}>
              <Sparkle />
            </button>
            <button className={styles.iconbtn} type="button" aria-label={lidOpen ? "Close the lid" : "Open the lid"} onClick={() => api.current?.toggleLid()}>
              <Laptop />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
