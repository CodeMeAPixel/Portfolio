import type { IconType } from 'react-icons'
import {
  IoBook,
  IoChatbubbles,
  IoCloudOutline,
  IoCodeSlash,
  IoCodeSlashOutline,
  IoCube,
  IoExtensionPuzzle,
  IoGameController,
  IoGameControllerOutline,
  IoGlobe,
  IoLayers,
  IoRocket,
  IoSchoolOutline,
  IoServer,
  IoServerOutline,
  IoShield,
  IoSpeedometer,
  IoTerminal,
  IoHelpCircle,
  IoDocumentText,
  IoSettings,
  IoConstruct,
  IoBug,
  IoFlash,
  IoGrid,
  IoHome,
  IoPeople,
  IoStar,
  IoHeart,
  IoFlag,
  IoMail,
  IoLink,
  IoImage,
  IoMusicalNotes,
  IoVideocam,
  IoPlanet,
  IoWifi,
  IoLockClosed,
  IoKey,
  IoAlbums,
  IoAnalytics,
  IoApps,
  IoBriefcase,
  IoCalendar,
  IoCart,
  IoChatbox,
  IoClipboard,
  IoColorPalette,
  IoCompass,
  IoDesktop,
  IoDownload,
  IoEye,
  IoFileTray,
  IoFitness,
  IoFolderOpen,
  IoGitBranch,
  IoHammer,
  IoInformation,
  IoLeaf,
  IoLibrary,
  IoList,
  IoLocation,
  IoMap,
  IoMedal,
  IoMegaphone,
  IoNotifications,
  IoPencil,
  IoPhonePortrait,
  IoPricetag,
  IoPulse,
  IoReader,
  IoReceipt,
  IoRefresh,
  IoSave,
  IoSearch,
  IoShareSocial,
  IoShirt,
  IoStorefront,
  IoSync,
  IoThunderstorm,
  IoTime,
  IoTrash,
  IoTrendingUp,
  IoTrophy,
  IoWarning,
} from 'react-icons/io5'

/**
 * Maps icon name strings (stored in the database) to react-icons/io5 components.
 * Add new icon names here as needed.
 */
const iconMap: Record<string, IconType> = {
  // Icons used in docs seed
  IoBook,
  IoChatbubbles,
  IoCodeSlash,
  IoCube,
  IoExtensionPuzzle,
  IoGameController,
  IoGlobe,
  IoLayers,
  IoRocket,
  IoServer,
  IoShield,
  IoSpeedometer,
  IoTerminal,

  // Icons used in referrals seed
  IoCloudOutline,
  IoCodeSlashOutline,
  IoGameControllerOutline,
  IoSchoolOutline,
  IoServerOutline,

  // Common extras
  IoHelpCircle,
  IoDocumentText,
  IoSettings,
  IoConstruct,
  IoBug,
  IoFlash,
  IoGrid,
  IoHome,
  IoPeople,
  IoStar,
  IoHeart,
  IoFlag,
  IoMail,
  IoLink,
  IoImage,
  IoMusicalNotes,
  IoVideocam,
  IoPlanet,
  IoWifi,
  IoLockClosed,
  IoKey,
  IoAlbums,
  IoAnalytics,
  IoApps,
  IoBriefcase,
  IoCalendar,
  IoCart,
  IoChatbox,
  IoClipboard,
  IoColorPalette,
  IoCompass,
  IoDesktop,
  IoDownload,
  IoEye,
  IoFileTray,
  IoFitness,
  IoFolderOpen,
  IoGitBranch,
  IoHammer,
  IoInformation,
  IoLeaf,
  IoLibrary,
  IoList,
  IoLocation,
  IoMap,
  IoMedal,
  IoMegaphone,
  IoNotifications,
  IoPencil,
  IoPhonePortrait,
  IoPricetag,
  IoPulse,
  IoReader,
  IoReceipt,
  IoRefresh,
  IoSave,
  IoSearch,
  IoShareSocial,
  IoShirt,
  IoStorefront,
  IoSync,
  IoThunderstorm,
  IoTime,
  IoTrash,
  IoTrendingUp,
  IoTrophy,
  IoWarning,
}

interface DynamicIconProps {
  name: string | null | undefined
  className?: string
  fallback?: React.ReactNode
}

/**
 * Renders an icon from its string name (e.g. "IoGameController").
 * Falls back to the icon name as text if no match is found.
 */
export function DynamicIcon({ name, className = 'h-5 w-5', fallback }: DynamicIconProps) {
  if (!name) return <>{fallback ?? null}</>

  const Icon = iconMap[name]
  if (Icon) return <Icon className={className} />

  // Fallback: render the string as-is (could be an emoji)
  return <span className={className}>{name}</span>
}

/**
 * Get the icon component from a string name. Returns undefined if not found.
 */
export function getIconByName(name: string): IconType | undefined {
  return iconMap[name]
}
