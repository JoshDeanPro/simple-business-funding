import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import type { SVGProps } from "react";
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBriefcase,
  faBuilding,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faCircleCheck,
  faCircleInfo,
  faClipboardCheck,
  faClock,
  faEllipsis,
  faEnvelope,
  faFileLines,
  faGripVertical,
  faLandmark,
  faLayerGroup,
  faMagnifyingGlass,
  faMinus,
  faPhone,
  faTableColumns,
  faUpload,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & { size?: number | string };

function makeIcon(icon: IconDefinition) {
  return function Icon({ className, ...props }: IconProps) {
    const fontProps = props as Omit<FontAwesomeIconProps, "icon">;
    return <FontAwesomeIcon icon={icon} className={className} {...fontProps} />;
  };
}

export const ArrowLeft = makeIcon(faArrowLeft);
export const ArrowRight = makeIcon(faArrowRight);
export const Building2 = makeIcon(faBuilding);
export const BriefcaseBusiness = makeIcon(faBriefcase);
export const Check = makeIcon(faCheck);
export const CheckCircle2 = makeIcon(faCircleCheck);
export const ChevronDown = makeIcon(faChevronDown);
export const ChevronDownIcon = ChevronDown;
export const ChevronLeft = makeIcon(faChevronLeft);
export const ChevronLeftIcon = ChevronLeft;
export const ChevronRight = makeIcon(faChevronRight);
export const ChevronRightIcon = ChevronRight;
export const ChevronUp = makeIcon(faChevronUp);
export const Circle = makeIcon(faCircle);
export const CircleInfo = makeIcon(faCircleInfo);
export const ClipboardCheck = makeIcon(faClipboardCheck);
export const Clock = makeIcon(faClock);
export const Clock3 = Clock;
export const Ellipsis = makeIcon(faEllipsis);
export const MoreHorizontal = Ellipsis;
export const Envelope = makeIcon(faEnvelope);
export const FileText = makeIcon(faFileLines);
export const GripVertical = makeIcon(faGripVertical);
export const Info = CircleInfo;
export const Landmark = makeIcon(faLandmark);
export const Layers = makeIcon(faLayerGroup);
export const Mail = Envelope;
export const Menu = makeIcon(faBars);
export const Minus = makeIcon(faMinus);
export const PanelLeft = makeIcon(faTableColumns);
export const Phone = makeIcon(faPhone);
export const PhoneCall = Phone;
export const Search = makeIcon(faMagnifyingGlass);
export const Upload = makeIcon(faUpload);
export const X = makeIcon(faXmark);
