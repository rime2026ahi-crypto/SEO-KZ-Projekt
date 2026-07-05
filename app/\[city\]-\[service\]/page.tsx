export default function DynamicPage({ params }: { params: { city: string; service: string } }) {
  const { city, service } = params;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {service.replace('-', ' ')} в {city.replace('-', ' ')}
        </h1>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
          <p className="text-gray-700">
            ✅ Это динамическая сгенерированная страница SEO!
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Параметры: город = {city}, услуга = {service}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Профессиональные услуги {service.replace('-', ' ')}</h2>

          <p>
            Наша компания предоставляет высококачественные услуги {service.replace('-', ' ')} в городе {city.replace('-', ' ')}.
            Мы имеем многолетний опыт работы в этой сфере и готовы помочь вам решить любые проблемы.
          </p>

          <h3>Почему выбрать нас?</h3>
          <ul>
            <li>✅ Опытные специалисты</li>
            <li>✅ Гарантия качества</li>
            <li>✅ Доступные цены</li>
            <li>✅ Быстрое выполнение</li>
            <li>✅ 24/7 поддержка</li>
          </ul>

          <h3>Как с нами связаться?</h3>
          <p>
            Позвоните нам по номеру: +7 (XXX) XXX-XX-XX<br/>
            Email: info@kz-service.pro<br/>
            Адрес: г. {city.replace('-', ' ')}
          </p>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600 text-sm">
            Эта страница автоматически сгенерирована на основе шаблонов SEO платформы.
            URL: /{city}-{service}/
          </p>
        </div>
      </div>
    </div>
  );
}
