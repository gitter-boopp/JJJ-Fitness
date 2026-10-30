import { useI18n } from '../i18n/i18n'
import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'

// Wird angezeigt, wenn jemand eine Adresse aufruft, die es nicht gibt.
export default function NotFoundPage() {
  const { t } = useI18n()

  return (
    <Section>
      <title>{`${t('notFound.title')} – JJJ Fitness`}</title>
      <PageHeader eyebrow={t('notFound.eyebrow')} title={t('notFound.heading')}>
        {t('notFound.text')}
      </PageHeader>
      <Button to="/" className="mt-10">
        {t('notFound.home')}
      </Button>
    </Section>
  )
}
