import { useGridStore, isGameInProgress } from "~/store";
import { useEffect } from "react";

import { TfiReload } from "react-icons/tfi";
import { FaQuestion } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import {
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

export const Options: React.FC = () => {
  const { inProgress, restart, dimension, setDimension, gap, setGap } =
    useGridStore((state) => ({
      restart: state.restart,
      inProgress: isGameInProgress(state),
      dimension: state.dimension,
      gap: state.gap,
      setDimension: state.setDimension,
      setGap: state.setGap,
    }));
  const {
    isOpen: isAboutOpen,
    onOpen: onAboutOpen,
    onClose: onAboutClose,
  } = useDisclosure();
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();

  const handleTabKeyPress = (event: KeyboardEvent) => {
    // space bar
    if (event.key === " ") {
      restart();
      event.preventDefault();
    }
  };

  useEffect(() => {
    // Add an event listener to the document for the 'keydown' event
    document.addEventListener("keydown", handleTabKeyPress);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleTabKeyPress);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const opacityStyle = `transition-opacity ${inProgress && "opacity-0"}`;

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-10">
        <Tooltip label="About">
          <span>
            <FaQuestion
              className={`size-6 text-[var(--sub-color)] hover:fill-[var(--text-color)] ${opacityStyle}`}
              onClick={onAboutOpen}
            />
          </span>
        </Tooltip>

        <Tooltip label="Restart [spacebar]">
          <span>
            <TfiReload
              className="size-6 text-[var(--sub-color)] hover:fill-[var(--text-color)]"
              onClick={restart}
            />
          </span>
        </Tooltip>

        <Tooltip label="Difficulty">
          <span>
            <IoMdSettings
              className={`size-6 text-[var(--sub-color)] hover:fill-[var(--text-color)] ${opacityStyle}`}
              onClick={onSettingsOpen}
            />
          </span>
        </Tooltip>
      </div>

      <Modal isCentered isOpen={isAboutOpen} onClose={onAboutClose}>
        <ModalOverlay />
        <ModalContent className="font-mono" bg="var(--bg-color)">
          <ModalHeader className="rounded-t text-[var(--sub-color)]">
            About Gaze
          </ModalHeader>
          <ModalCloseButton color="gray" />
          <ModalBody className="flex flex-col gap-5 text-[var(--text-color)]">
            <p>
              ⚡Training peripheral vision offers several benefits such as
              improved situational awareness, quicker reaction times, and faster
              reading speeds.
            </p>
            <p>
              📈 The Schultz Table works like a visual boot camp, leveling up
              your peripheral vision game.
            </p>
            <p>
              💪 Playing a few games daily can lead to substantial vision
              improvements.
            </p>
          </ModalBody>
          <ModalFooter className="rounded-b" />
        </ModalContent>
      </Modal>

      <Modal isCentered isOpen={isSettingsOpen} onClose={onSettingsClose}>
        <ModalOverlay />
        <ModalContent className="font-mono" bg="var(--bg-color)">
          <ModalHeader className="rounded-t text-[var(--sub-color)]">
            Difficulty
          </ModalHeader>
          <ModalCloseButton color="gray" />
          <ModalBody className="flex flex-col gap-5 text-[var(--text-color)]">
            <div className="flex">
              <span className="w-16">Size:</span>
              <Slider
                aria-label="slider-dimension"
                min={2}
                max={5}
                step={1}
                value={dimension}
                onChange={(e) => setDimension(e)}
                colorScheme="yellow"
                mx="5"
              >
                <SliderTrack bg="var(--sub-color)">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg="var(--main-color)" />
              </Slider>
            </div>
            <div className="flex">
              <span className="w-16">Gap:</span>
              <Slider
                aria-label="slider-dimension"
                min={1}
                max={5}
                step={1}
                value={gap}
                onChange={(e) => setGap(e)}
                colorScheme="yellow"
                mx="5"
              >
                <SliderTrack bg="var(--sub-color)">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg="var(--main-color)" />
              </Slider>
            </div>
          </ModalBody>
          <ModalFooter className="rounded-b" />
        </ModalContent>
      </Modal>
    </div>
  );
};
