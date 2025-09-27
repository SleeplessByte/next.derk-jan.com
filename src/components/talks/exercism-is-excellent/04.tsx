import track_8th from "/src/assets/talks/exercism-is-excellent/tracks/8th.svg";
import track_abap from "/src/assets/talks/exercism-is-excellent/tracks/abap.svg";
import track_awk from "/src/assets/talks/exercism-is-excellent/tracks/awk.svg";
import track_ballerina from "/src/assets/talks/exercism-is-excellent/tracks/ballerina.svg";
import track_bash from "/src/assets/talks/exercism-is-excellent/tracks/bash.svg";
import track_c from "/src/assets/talks/exercism-is-excellent/tracks/c.svg";
import track_cfml from "/src/assets/talks/exercism-is-excellent/tracks/cfml.svg";
import track_clojurescript from "/src/assets/talks/exercism-is-excellent/tracks/clojurescript.svg";
import track_cobol from "/src/assets/talks/exercism-is-excellent/tracks/cobol.svg";
import track_coffeescript from "/src/assets/talks/exercism-is-excellent/tracks/coffeescript.svg";
import track_cpp from "/src/assets/talks/exercism-is-excellent/tracks/cpp.svg";
import track_crystal from "/src/assets/talks/exercism-is-excellent/tracks/crystal.svg";
import track_d from "/src/assets/talks/exercism-is-excellent/tracks/d.svg";
import track_dart from "/src/assets/talks/exercism-is-excellent/tracks/dart.svg";
import track_delphi from "/src/assets/talks/exercism-is-excellent/tracks/delphi.svg";
import track_emacs_lisp from "/src/assets/talks/exercism-is-excellent/tracks/emacs-lisp.svg";
import track_erlang from "/src/assets/talks/exercism-is-excellent/tracks/erlang.svg";
import track_fortran from "/src/assets/talks/exercism-is-excellent/tracks/fortran.svg";
import track_gleam from "/src/assets/talks/exercism-is-excellent/tracks/gleam.svg";
import track_groovy from "/src/assets/talks/exercism-is-excellent/tracks/groovy.svg";
import track_haskell from "/src/assets/talks/exercism-is-excellent/tracks/haskell.svg";
import track_julia from "/src/assets/talks/exercism-is-excellent/tracks/julia.svg";
import track_kotlin from "/src/assets/talks/exercism-is-excellent/tracks/kotlin.svg";
import track_lfe from "/src/assets/talks/exercism-is-excellent/tracks/lfe.svg";
import track_lua from "/src/assets/talks/exercism-is-excellent/tracks/lua.svg";
import track_mips from "/src/assets/talks/exercism-is-excellent/tracks/mips.svg";
import track_nim from "/src/assets/talks/exercism-is-excellent/tracks/nim.svg";
import track_objective_c from "/src/assets/talks/exercism-is-excellent/tracks/objective-c.svg";
import track_ocaml from "/src/assets/talks/exercism-is-excellent/tracks/ocaml.svg";
import track_perl5 from "/src/assets/talks/exercism-is-excellent/tracks/perl5.svg";
import track_pharo_smalltalk from "/src/assets/talks/exercism-is-excellent/tracks/pharo-smalltalk.svg";
import track_php from "/src/assets/talks/exercism-is-excellent/tracks/php.svg";
import track_plsql from "/src/assets/talks/exercism-is-excellent/tracks/plsql.svg";
import track_prolog from "/src/assets/talks/exercism-is-excellent/tracks/prolog.svg";
import track_purescript from "/src/assets/talks/exercism-is-excellent/tracks/purescript.svg";
import track_r from "/src/assets/talks/exercism-is-excellent/tracks/r.svg";
import track_racket from "/src/assets/talks/exercism-is-excellent/tracks/racket.svg";
import track_raku from "/src/assets/talks/exercism-is-excellent/tracks/raku.svg";
import track_reasonml from "/src/assets/talks/exercism-is-excellent/tracks/reasonml.svg";
import track_red from "/src/assets/talks/exercism-is-excellent/tracks/red.svg";
import track_scala from "/src/assets/talks/exercism-is-excellent/tracks/scala.svg";
import track_scheme from "/src/assets/talks/exercism-is-excellent/tracks/scheme.svg";
import track_sml from "/src/assets/talks/exercism-is-excellent/tracks/sml.svg";
import track_tcl from "/src/assets/talks/exercism-is-excellent/tracks/tcl.svg";
import track_typescript from "/src/assets/talks/exercism-is-excellent/tracks/typescript.svg";
import track_unison from "/src/assets/talks/exercism-is-excellent/tracks/unison.svg";
import track_vbnet from "/src/assets/talks/exercism-is-excellent/tracks/vbnet.svg";
import track_vimscript from "/src/assets/talks/exercism-is-excellent/tracks/vimscript.svg";
import track_vlang from "/src/assets/talks/exercism-is-excellent/tracks/vlang.svg";
import track_wasm from "/src/assets/talks/exercism-is-excellent/tracks/wasm.svg";
import track_wren from "/src/assets/talks/exercism-is-excellent/tracks/wren.svg";
import track_x86_64_assembly from "/src/assets/talks/exercism-is-excellent/tracks/x86-64-assembly.svg";
import track_zig from "/src/assets/talks/exercism-is-excellent/tracks/zig.svg";

import track_clojure from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/clojure.svg";
import track_common_lisp from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/common-lisp.svg";
import track_csharp from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/csharp.svg";
import track_elixir from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/elixir.svg";
import track_elm from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/elm.svg";
import track_fsharp from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/fsharp.svg";
import track_go from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/go.svg";
import track_java from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/java.svg";
import track_javascript from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/javascript.svg";
import track_jq from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/jq.svg";
import track_python from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/python.svg";
import track_ruby from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/ruby.svg";
import track_rust from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/rust.svg";
import track_swift from "/src/assets/talks/exercism-is-excellent/tracks/syllabus/swift.svg";

import { useEffect, useState } from "react";
import type { Variants } from "motion";
import { motion } from "motion/react";
import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";

const TRACKS = [
  { src: track_8th, syllabus: false, web: true },
  { src: track_abap, syllabus: false, web: true },
  { src: track_awk, syllabus: false, web: true },
  { src: track_ballerina, syllabus: false, web: true },
  { src: track_bash, syllabus: false, web: true, work: true },
  { src: track_c, syllabus: false, web: true, work: true },
  { src: track_cfml, syllabus: false, web: true },
  { src: track_clojure, syllabus: true, web: true },
  { src: track_clojurescript, syllabus: false, web: true },
  { src: track_common_lisp, syllabus: true, web: true, work: true },
  { src: track_csharp, syllabus: true, web: true, work: true },
  { src: track_cobol, syllabus: false, web: true },
  { src: track_coffeescript, syllabus: false, web: true },
  { src: track_cpp, syllabus: false, web: true },
  { src: track_crystal, syllabus: false, web: true },
  { src: track_d, syllabus: false, web: true },
  { src: track_dart, syllabus: false, web: true },
  { src: track_delphi, syllabus: false, web: false },
  { src: track_elixir, syllabus: true, web: true },
  { src: track_elm, syllabus: true, web: true },
  { src: track_emacs_lisp, syllabus: false, web: true },
  { src: track_erlang, syllabus: false, web: true },
  { src: track_fortran, syllabus: false, web: true },
  { src: track_fsharp, syllabus: true, web: true },
  { src: track_gleam, syllabus: false, web: true },
  { src: track_go, syllabus: true, web: true },
  { src: track_groovy, syllabus: false, web: true },
  { src: track_haskell, syllabus: false, web: true },
  { src: track_java, syllabus: true, web: true },
  {
    src: track_javascript,
    syllabus: true,
    web: true,
    maintain: true,
    work: true,
  },
  { src: track_jq, syllabus: true, web: true },
  { src: track_julia, syllabus: false, web: true },
  { src: track_kotlin, syllabus: false, web: true, work: true },
  { src: track_lfe, syllabus: false, web: true },
  { src: track_lua, syllabus: false, web: true },
  { src: track_mips, syllabus: false, web: true },
  { src: track_nim, syllabus: false, web: true },
  { src: track_objective_c, syllabus: false, web: true },
  { src: track_ocaml, syllabus: false, web: true },
  { src: track_perl5, syllabus: false, web: true },
  { src: track_pharo_smalltalk, syllabus: false, web: true },
  { src: track_php, syllabus: false, web: true, work: true },
  { src: track_plsql, syllabus: false, web: false, work: true },
  { src: track_prolog, syllabus: false, web: true },
  { src: track_purescript, syllabus: false, web: true },
  { src: track_python, syllabus: true, web: true },
  { src: track_r, syllabus: false, web: true },
  { src: track_racket, syllabus: false, web: true },
  { src: track_raku, syllabus: false, web: true },
  { src: track_reasonml, syllabus: false, web: true },
  { src: track_red, syllabus: false, web: true },
  { src: track_ruby, syllabus: true, web: true, work: true },
  { src: track_rust, syllabus: true, web: true },
  { src: track_scala, syllabus: false, web: true },
  { src: track_scheme, syllabus: false, web: true },
  { src: track_sml, syllabus: false, web: true },
  { src: track_swift, syllabus: true, web: true, work: true },
  { src: track_tcl, syllabus: false, web: true },
  {
    src: track_typescript,
    syllabus: false,
    web: true,
    maintain: true,
    work: true,
  },
  { src: track_unison, syllabus: false, web: true },
  { src: track_vbnet, syllabus: false, web: true },
  { src: track_vimscript, syllabus: false, web: true },
  { src: track_vlang, syllabus: false, web: true },
  { src: track_wasm, syllabus: false, web: true },
  { src: track_wren, syllabus: false, web: true },
  { src: track_x86_64_assembly, syllabus: false, web: true },
  { src: track_zig, syllabus: false, web: true },
];
const delayIdle = 2;
const staggerIdle = 0.1;

const timeToIdle = staggerIdle * TRACKS.length + delayIdle;
const waitingAfterIdle = 5;
const timeToWork = 10;
const timeToWeb = 20;

console.log(timeToIdle + waitingAfterIdle + timeToWork + timeToWeb);

const container: Variants = {
  hidden: { opacity: 0 },

  idle: {
    opacity: 1,

    transition: {
      delay: delayIdle,
      delayChildren: delayIdle,
      staggerChildren: staggerIdle,
    },
  },

  inactive: {
    opacity: 1,
  },

  active: {
    opacity: 1,
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  idle: { opacity: 0.8, scale: 0.9 },
  inactive: { opacity: 0.3, scale: 0.75 },
  active: { opacity: 1, scale: 1.0 },
};

const NEXT_SLIDE_COUNT = 5;
const NEXT_SLIDE_LABEL = "Editor";
const NEXT_TIMEOUT = 60 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/05";

export default function Page() {
  const [animate, setAnimate] = useState<
    "none" | "maintain" | "syllabus" | "web" | "work"
  >("none");

  useEffect(() => {
    switch (animate) {
      case "none": {
        const timer = setTimeout(
          () => {
            setAnimate("maintain");
          },
          timeToIdle * 1000 + waitingAfterIdle * 1000,
        );

        return () => {
          clearTimeout(timer);
        };
      }

      case "maintain": {
        const timer = setTimeout(() => {
          setAnimate("work");
        }, timeToWork * 1000);

        return () => {
          clearTimeout(timer);
        };
      }

      case "work": {
        const timer = setTimeout(() => {
          setAnimate("web");
        }, timeToWeb * 1000);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [animate]);

  return (
    <div className="w-full">
      <header className="sr-only">
        <h2 className="sr-only">Slide 4: about the languages</h2>
      </header>

      <motion.div
        variants={container}
        initial="hidden"
        animate="idle"
        className="grid grid-cols-7 md:grid-cols-10 w-full md:max-w-[60vw] md:mx-auto"
      >
        {TRACKS.map((track, index) => {
          return (
            <motion.div
              key={index}
              variants={item}
              animate={animateForState(animate, track)}
              className={`aspect-w-1 aspect-h-1 grid-cols-1 relative ${
                Math.floor(index / 10) % 2 === 0 ? "md:left-1/2" : ""
              }`}
            >
              <img
                src={track.src.src}
                width={96}
                height={96}
                alt=""
                style={{ margin: 0 }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <AutoSlideFooter
        next={NEXT_SLIDE}
        nextCount={NEXT_SLIDE_COUNT}
        nextLabel={NEXT_SLIDE_LABEL}
        duration={NEXT_TIMEOUT}
      />
    </div>
  );
}

function animateForState(
  animate: "none" | "maintain" | "syllabus" | "web" | "work",
  track: (typeof TRACKS)[number],
) {
  switch (animate) {
    case "none": {
      return undefined;
    }

    case "maintain": {
      return track.maintain ? "active" : "inactive";
    }

    case "work": {
      return track.work ? "active" : "inactive";
    }

    case "syllabus": {
      return track.syllabus ? "active" : "inactive";
    }

    case "web": {
      return track.web ? "active" : "inactive";
    }
  }
}
