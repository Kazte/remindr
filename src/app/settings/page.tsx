import {Separator} from '~/components/ui/separator';
import ThemeSwitcher from '~/components/ThemeSwitcher';

export default function SettingsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Theme</h3>
        <p className='text-sm text-muted-foreground'>
          Set your favourite theme.
        </p>
      </div>
      <Separator/>
      <ThemeSwitcher/>
    </div>
  );
}