import React from "react"
import { modalStyles as styles } from "../assets/dummystyle"
import { X } from "lucide-react"

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader = false,
  showActionBtn = false,
  actionBtnIcon = null,
  actionBtnText = "",
  onActionClick = () => {}
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Header */}
        {!hideHeader && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {showActionBtn && (
              <button
                type="button"
                className={styles.actionButton}
                onClick={onActionClick}
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Body */}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
