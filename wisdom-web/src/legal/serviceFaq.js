// Contenido editorial de la web, separado de las políticas sincronizadas con la app.
const sections = {
  es: [
    ['home-services', 'Servicios a domicilio y profesionales cerca de ti', [
      ['find-home-services', '¿Cómo encontrar servicios a domicilio con Wisdom?', 'Busca el servicio que necesitas en la app, indica la ubicación y compara las ofertas disponibles. Revisa la descripción, el precio, las valoraciones y la disponibilidad antes de enviar una solicitud de reserva al profesional.'],
      ['nearby', '¿Cómo buscar profesionales cerca de mí?', 'Utiliza tu ubicación o la dirección donde necesitas el servicio. En los servicios presenciales, comprueba que el profesional se desplace a esa zona; en los servicios online, la distancia no determina dónde se realiza el trabajo.'],
      ['cities', '¿Puedo buscar servicios a domicilio en Mataró, Barcelona u otra localidad?', 'Puedes buscar indicando la ubicación donde necesitas ayuda. Los resultados dependen de los servicios publicados, del radio de desplazamiento y de la disponibilidad de cada profesional. Revisa las ofertas de tu zona en la app antes de planificar la reserva.'],
      ['compare', '¿Qué debo comparar antes de contratar un profesional a domicilio?', 'Compara el alcance del trabajo, la forma de calcular el precio, la ubicación, la disponibilidad y las reseñas. Revisa qué incluye cada oferta y utiliza las preguntas previas si el profesional las ha habilitado para resolver dudas antes de reservar.'],
      ['home-or-online', '¿Todos los servicios de Wisdom se realizan a domicilio?', 'No. Wisdom permite encontrar servicios presenciales y online. Consulta la modalidad y la ubicación de cada oferta para saber si el profesional se desplaza, si debes acudir a un lugar concreto o si el servicio se realiza a distancia.'],
    ]],
    ['home-cleaning', 'Limpieza a domicilio y limpieza del hogar', [
      ['find-cleaning', '¿Cómo buscar un servicio de limpieza a domicilio?', 'Busca limpieza del hogar en Wisdom y utiliza la ubicación donde necesitas el servicio. Compara las ofertas disponibles y lee la descripción para comprobar qué tareas de limpieza incluye cada profesional.'],
      ['hourly-cleaning', '¿Puedo encontrar limpieza por horas?', 'Comprueba cómo ha configurado el profesional su oferta de limpieza: el precio y la duración dependen de cada servicio. Si se ofrece por horas, revisa la tarifa y la duración antes de solicitar la reserva.'],
      ['cleaning-price', '¿Cuánto cuesta contratar limpieza a domicilio?', 'No hay una tarifa única para todos los profesionales. Consulta el precio de la oferta, la duración y el desglose que aparece al reservar. Compara servicios con tareas y condiciones equivalentes para valorar el coste.'],
      ['cleaning-tasks', '¿Qué incluye una limpieza del hogar?', 'Las tareas incluidas las define cada profesional en su oferta. Comprueba si contempla las zonas y trabajos que necesitas, como cocina, baños, suelos o cristales, y aclara cualquier tarea especial antes de reservar.'],
      ['cleaning-materials', '¿La limpieza a domicilio incluye productos y materiales?', 'Revisa la descripción del servicio; no todas las ofertas incluyen lo mismo. Si no queda claro quién aporta los productos o utensilios, consúltalo con el profesional cuando tenga habilitadas las preguntas previas.'],
      ['recurring-cleaning', '¿Puedo reservar limpieza de forma recurrente?', 'Wisdom dispone de reservas recurrentes para los servicios que admiten esa modalidad. Comprueba si la oferta de limpieza permite programar sesiones y revisa la frecuencia, los horarios y las condiciones de la reserva.'],
      ['prepare-cleaning', '¿Qué información conviene dar al reservar una limpieza?', 'Describe las zonas que quieres limpiar, las tareas prioritarias y cualquier condición relevante del domicilio. Indica la ubicación, la fecha y la duración cuando el servicio las requiera para que el profesional pueda valorar la solicitud.'],
    ]],
    ['other-services', 'Hogar, clases, bienestar y mascotas', [
      ['repairs', '¿Cómo encontrar fontaneros, electricistas o profesionales de reformas?', 'Busca el oficio o la tarea concreta que necesitas y compara los servicios disponibles en tu zona. Revisa la descripción y explica el trabajo al solicitar la reserva; las condiciones y la disponibilidad dependen de cada oferta.'],
      ['garden-paint', '¿Puedo buscar servicios de jardinería o pintura a domicilio?', 'Wisdom incluye categorías de jardinería y pintura. Busca la tarea y la ubicación, revisa los perfiles disponibles y comprueba el alcance del trabajo y las condiciones indicadas por el profesional.'],
      ['lessons', '¿Cómo buscar clases particulares a domicilio u online?', 'Busca la materia que quieres aprender, como idiomas, matemáticas, música o programación. Compara las ofertas y revisa si las clases son presenciales u online, su duración y el horario disponible.'],
      ['wellness', '¿Puedo encontrar entrenadores personales y servicios de bienestar?', 'Puedes explorar categorías como entrenamiento personal, yoga o masajes. Consulta la descripción y la modalidad de cada servicio y comprueba la experiencia y las condiciones que publica el profesional.'],
      ['pets', '¿Cómo buscar cuidado de mascotas o paseadores de perros?', 'Busca cuidado de mascotas o paseo de perros y revisa los servicios disponibles cerca de la ubicación que necesitas. Explica las necesidades del animal y comprueba los horarios y el alcance del servicio antes de reservar.'],
    ]],
    ['getting-started', 'Empezar a contratar u ofrecer servicios', [
      ['download', '¿Dónde descargo la app de Wisdom para contratar servicios?', 'La página de descarga de Wisdom incluye los enlaces a App Store y Google Play. Desde la app puedes buscar servicios, comparar profesionales y gestionar tus reservas.'],
      ['professional-cleaning', '¿Puedo ofrecer mis servicios de limpieza o mantenimiento en Wisdom?', 'Puedes utilizar el modo profesional para publicar tus servicios, describir el trabajo que ofreces y configurar sus precios y disponibilidad. Desde la misma cuenta puedes gestionar clientes y solicitudes de reserva.'],
      ['booking-confirmation', '¿Cuándo puedo dar por confirmada una visita a domicilio?', 'Enviar una solicitud no significa que la cita ya esté aceptada. Comprueba el estado en el detalle de la reserva: la confirmación depende de que el profesional acepte la solicitud.'],
    ]],
  ],
  en: [
    ['home-services', 'Home services and professionals near you', [
      ['find-home-services', 'How can I find home services with Wisdom?', 'Search for the service you need in the app, enter the location and compare available offers. Check the description, price, reviews and availability before sending a booking request to the professional.'],
      ['nearby', 'How can I find professionals near me?', 'Use your location or the address where you need the service. For in-person services, check that the professional travels to that area; for online services, distance does not determine where the work takes place.'],
      ['cities', 'Can I search for home services in Mataró, Barcelona or another town?', 'Search using the location where you need help. Results depend on published services, travel radius and each professional’s availability. Check offers in the app before planning a booking.'],
      ['compare', 'What should I compare before booking a home service?', 'Compare the scope of work, pricing method, location, availability and reviews. Check what each offer includes and use pre-booking questions, when enabled by the professional, to clarify details.'],
      ['home-or-online', 'Are all Wisdom services provided at home?', 'No. Wisdom supports in-person and online services. Check each offer’s format and location to see whether the professional travels to you, you attend a specific place, or the work is done remotely.'],
    ]],
    ['home-cleaning', 'Home cleaning services', [
      ['find-cleaning', 'How can I find a home cleaning service?', 'Search for home cleaning in Wisdom and use the location where you need the service. Compare available offers and read the description to check which cleaning tasks each professional includes.'],
      ['hourly-cleaning', 'Can I find cleaning by the hour?', 'Check how the professional has set up the cleaning offer: price and duration depend on each service. If it is charged by the hour, review the rate and duration before requesting a booking.'],
      ['cleaning-price', 'How much does home cleaning cost?', 'There is no single rate for all professionals. Check the offer’s price, duration and the breakdown shown when booking. Compare services with equivalent tasks and conditions to assess the cost.'],
      ['cleaning-tasks', 'What does home cleaning include?', 'Each professional defines the included tasks in their offer. Check whether it covers the areas and tasks you need, such as kitchens, bathrooms, floors or windows, and clarify any special work before booking.'],
      ['cleaning-materials', 'Does home cleaning include products and equipment?', 'Read the service description; offers do not all include the same things. If it is unclear who provides products or equipment, ask the professional when pre-booking questions are enabled.'],
      ['recurring-cleaning', 'Can I book recurring cleaning?', 'Wisdom supports recurring bookings for services that allow them. Check whether the cleaning offer supports scheduled sessions and review the frequency, times and booking conditions.'],
      ['prepare-cleaning', 'What information should I provide when booking cleaning?', 'Describe the areas to clean, priority tasks and any relevant conditions at the property. Provide the location, date and duration when required so the professional can assess the request.'],
    ]],
    ['other-services', 'Home maintenance, lessons, wellness and pets', [
      ['repairs', 'How can I find plumbers, electricians or renovation professionals?', 'Search for the trade or specific task and compare available services in your area. Read the description and explain the work when requesting a booking; conditions and availability depend on each offer.'],
      ['garden-paint', 'Can I search for gardening or painting services at home?', 'Wisdom includes gardening and painting categories. Search for the task and location, review available profiles and check the scope of work and the professional’s conditions.'],
      ['lessons', 'How can I find private lessons at home or online?', 'Search for the subject you want to learn, such as languages, mathematics, music or programming. Compare offers and check whether lessons are in person or online, their duration and available times.'],
      ['wellness', 'Can I find personal trainers and wellness services?', 'You can explore categories such as personal training, yoga and massage. Read each service’s description and format and check the experience and conditions published by the professional.'],
      ['pets', 'How can I find pet care or dog walkers?', 'Search for pet care or dog walking and review services near the required location. Explain the animal’s needs and check the times and scope of the service before booking.'],
    ]],
    ['getting-started', 'Start booking or offering services', [
      ['download', 'Where can I download Wisdom to book services?', 'Wisdom’s download page includes links to the App Store and Google Play. In the app you can search for services, compare professionals and manage bookings.'],
      ['professional-cleaning', 'Can I offer cleaning or maintenance services on Wisdom?', 'Use professional mode to publish your services, describe the work you offer and configure prices and availability. The same account lets you manage clients and booking requests.'],
      ['booking-confirmation', 'When is a home visit confirmed?', 'Sending a request does not mean the appointment has been accepted. Check the status in the booking details: confirmation depends on the professional accepting the request.'],
    ]],
  ],
};

export function getServiceFaqSections(language) {
  return (sections[language] || sections.en).map(([id, title, items]) => ({
    id: `services-${id}`, title,
    items: items.map(([key, question, answer]) => ({ id: `services-${key}`, question, answer })),
  }));
}
