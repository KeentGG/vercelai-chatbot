import { Button } from '@/components/ui/button'
import {
  IconPlus,
  IconGenerateDocs,
  IconNoteSelf,
  IconUploadDoc,
  IconBriefMe,
  IconNotes
} from '@/components/ui/icons'
import { CoordPoint } from '@/lib/types'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { degToRad, radToPoint } from '@/lib/utils'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export function CircularActionMenu({ className }: { className?: string }) {
  const circularRadius = 48
  const offset = 32
  const menuButtons = [
    {
      label: 'Generate Docs',
      icon: <IconGenerateDocs />
    },
    {
      label: 'Brief Me',
      icon: <IconBriefMe />
    },
    {
      label: 'Note',
      icon: <IconNotes />
    },
    {
      label: 'Upload Docs',
      icon: <IconUploadDoc />
    },
    {
      label: 'Note to Self',
      icon: <IconNoteSelf />
    }
  ]
  const defaultCtaVariant = 'outline'
  const [isActive, setIsActive] = useState(false)

  function getCircularAngle(
    index: number,
    max: number,
    offset?: number
  ): number {
    return (360 / max) * index + 1 + (offset ?? 0)
  }

  function getNodePos(radius: number, degree: number): CoordPoint {
    const rad = degToRad(degree)

    return radToPoint(rad, radius)
  }

  function parseTooltipSide(i: number) {
    if (i == 0 || i == 4) return 'right'
    if (i == 1) return 'top'
    if (i == 2 || i == 3) return 'left'
  }

  return (
    <div className={cn(className)}>
      <div className="z-50 absolute-center flex">
        <div
          className={cn(
            'relative z-50 *:-translate-x-1/2 *:-translate-y-1/2 transition-opacity'
          )}
        >
          {menuButtons.map((btn, i) => {
            const angle = getCircularAngle(i, menuButtons.length, offset)
            const pos = getNodePos(circularRadius, angle)
            return (
              <div
                className={cn(
                  'z-10 absolute opacity-99 transition-all duration-300 scale-100 size-auto',
                  !isActive && 'opacity-0 scale-75 size-0',
                  i == 1 && 'z-0',
                  i == 3 && 'z-20'
                )}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transitionDelay: `${50 * i}ms`
                }}
                key={i}
              >
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        'size-10 rounded-full bg-background p-0',
                        !isActive && 'hidden'
                      )}
                    >
                      {btn.icon}
                      <span className="sr-only">{btn.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side={parseTooltipSide(i)} className="z-50">
                    {btn.label}
                  </TooltipContent>
                </Tooltip>
              </div>
            )
          })}
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={isActive ? 'secondary' : 'outline'}
            size="icon"
            className={cn(
              'size-6 rounded-full p-0 rotate-0 transition-all',
              isActive && 'rotate-45'
            )}
            onClick={() => setIsActive(!isActive)}
          >
            <IconPlus />
            <span className="sr-only">New Chat</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="z-50">What can i do for you?</TooltipContent>
      </Tooltip>
    </div>
  )
}
