import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

import { Link, NavLink } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { ClipboardListIcon } from "lucide-react"
import { ReactNode } from "react"

interface PageDef {
  label: string,
  path: string,
  icon?: ReactNode,
}
interface Props {
  pages: PageDef[]
}
export default function AppMenu ({pages}:Props) {
  const navStyle = 'sticky top-0 z-50 flex justify-center w-full shadow-sm backgrop-blur p-1 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40'
  const navItemStyle = 'group inline-flex h-9 w-max items-center justify-center font-light rounded-md px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
  const showModeToggle = false

  const iconFor = (p:PageDef) => {
    if (p.icon) return p.icon
    if (p.label == 'Players') return <ClipboardListIcon strokeWidth={1}/>
    return undefined
  }
  return (<>
    <header className={navStyle}>
      <NavigationMenu className='flex w-full justify-center sm:justify-between max-w-2xl'>
        <Link to='/'>
          <NavigationMenuItem className={cn(navItemStyle,'mx-1 px-1 pr-4 font-bold')}>
            <img alt='hand-flick-logo' className='max-h-6 pr-2' src={import.meta.env.BASE_URL+'/hand-flick-sticker.svg'}/>
            <span>Crokinole Tourney</span>
          </NavigationMenuItem>
        </Link>
        <NavigationMenuList className='bg-none hidden sm:inline'>
          {pages.map(page=>(
            <NavLink key={page.label} to={page.path}>
              {({isActive}) => (
                <NavigationMenuItem className={cn(navItemStyle, {'font-semibold':isActive})}>
                  {page.label}
                </NavigationMenuItem>
              )}
            </NavLink>
          ))}
        </NavigationMenuList>
        {showModeToggle ? <ModeToggle/> : undefined }
      </NavigationMenu>
    </header>
    <footer className='sm:hidden w-full z-50 flex justify-around text-white bg-sky-800 fixed bottom-0 p-1 font-light'>
      <NavigationMenu>
        <NavigationMenuList className='bg-none'>
          {pages.map(page=>(
              <NavLink key={page.label} to={page.path}>
                {({isActive}) => (
                  <NavigationMenuItem className={cn(navItemStyle, {'font-semibold':isActive})}>
                    {iconFor(page)}
                  </NavigationMenuItem>
                )}
              </NavLink>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </footer>
  </>)
}