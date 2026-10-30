import { useI18n } from '../i18n/i18n'
import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

// Übersicht über unser Design-System. Praktisch für die Projektdoku (Screenshot!)
// und als Nachschlagewerk, welche Bausteine es schon gibt.

const colors = [
  { key: 'bg', token: 'bg', hex: '#0B0B0F', className: 'bg-bg border border-white/10' },
  { key: 'surface', token: 'surface', hex: '#16161D', className: 'bg-surface' },
  { key: 'surface2', token: 'surface-2', hex: '#1F1F28', className: 'bg-surface-2' },
  { key: 'text', token: 'text', hex: '#F5F5F7', className: 'bg-text' },
  { key: 'muted', token: 'muted', hex: '#A1A1AA', className: 'bg-muted' },
  { key: 'accent', token: 'accent', hex: '#C6FF3D', className: 'bg-accent' },
]

// Kleine Überschrift für jeden Bereich der Seite
function Heading({ children }: { children: string }) {
  return <h2 className="mb-6 text-2xl md:text-3xl">{children}</h2>
}

export default function StyleguidePage() {
  const { t } = useI18n()

  return (
    <>
      <title>{`${t('styleguide.title')} – JJJ Fitness`}</title>

      <Section>
        <PageHeader eyebrow={t('styleguide.eyebrow')} title={t('styleguide.heading')}>
          {t('styleguide.intro')}
        </PageHeader>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Heading>{t('styleguide.colors')}</Heading>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colors.map((color) => (
            <li key={color.token}>
              <div className={`aspect-square rounded-2xl ${color.className}`} />
              <p className="mt-3 font-medium">{t(`styleguide.colorNames.${color.key}`)}</p>
              <p className="text-sm text-muted">
                {color.token} · {color.hex}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Heading>{t('styleguide.fonts')}</Heading>
        <div className="space-y-8">
          <div>
            <p className="mb-2 text-sm text-muted">{t('styleguide.fontHeading')}</p>
            <p className="font-display text-5xl font-bold tracking-tight md:text-7xl">{t('styleguide.sampleHeading')}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-muted">{t('styleguide.fontBody')}</p>
            <p className="max-w-2xl text-lg">{t('styleguide.sampleText')}</p>
          </div>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Heading>{t('styleguide.buttons')}</Heading>
        <div className="flex flex-wrap items-center gap-4">
          <Button>{t('styleguide.primary')}</Button>
          <Button variant="secondary">{t('styleguide.secondary')}</Button>
          <Button variant="ghost">{t('styleguide.ghost')}</Button>
          <Button size="sm">{t('styleguide.small')}</Button>
          <Button size="lg">{t('styleguide.large')}</Button>
          <Button disabled>{t('styleguide.disabled')}</Button>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Heading>{t('styleguide.cards')}</Heading>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-xl">{t('styleguide.normalCard')}</h3>
            <p className="mt-2 text-muted">{t('styleguide.normalCardText')}</p>
          </Card>
          <Card interactive>
            <h3 className="text-xl">{t('styleguide.interactiveCard')}</h3>
            <p className="mt-2 text-muted">{t('styleguide.interactiveCardText')}</p>
          </Card>
        </div>
      </Section>
    </>
  )
}
