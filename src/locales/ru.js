import MainBlock from "../components/ComplexComponents/MainBlock/MainBlock";

const ru = {
    translation: {
        // Заголовки страниц
        pageTitles: {
            home: "НП ООО «Берлио» - Главная",
            about: "НП ООО «Берлио» - О Берлио",
            contacts: "НП ООО «Берлио» - Контакты",
            news: "НП ООО «Берлио» - Новости",
            equipment: "НП ООО «Берлио» - Оборудование и ПО",
            forClients: "НП ООО «Берлио» - Для клиентов",
            forPartners: "НП ООО «Берлио» - Для партнеров",
            detailedNews: "НП ООО «Берлио» - Подробности новости",
        },

        // Для Header
        departmentsPhone: "Телефоны филиалов",
        allContacts: "Все контакты",
        searchAzs: "Поиск АЗС",
        personalAccount: "Личный кабинет",
        customerService: "Обслуживание клиентов",

        // Minsk
        companyName: "НП ООО «БЕРЛИО»",
        minskName: "Головной офис",
        minskAddress: "Минская область, г. Минск, ул. Быховская 55",
        minskFooterAddress: "ул. Быховская 55, г. Минск, Беларусь, 220007",
        inMinskCity: "в Минске",

        // Brest
        brestName: "Брестский филиал",
        brestAddress: "Брестская область, г. Брест, ул. Карла Маркса, 33 – 43",
        brestFooterAddress: "ул. К.Маркса 33, офис 43, г. Брест, Беларусь, 224005",
        inBrestCity: "в Бресте",

        // Vitebsk
        vitebskName: "Витебский филиал",
        vitebskAddress: "Витебская область, г. Витебск, ул. Правды 37, корп. 2",
        vitebskFooterAddress: "ул. Правды 37, корпус 2, офис 84, г. Витебск, Беларусь, 210029",
        inVitebskCity: "в Витебске",

        // Gomel
        gomelName: "Гомельский филиал",
        gomelAddress: "Гомельская область, г. Гомель, ул. Речицкая 1А",
        gomelFooterAddress: "ул. Речицкая 1а, кабинет 419, г. Гомель, Беларусь, 246017",
        inGomelCity: "в Гомеле",

        // Grodno
        grodnoName: "Гродненский филиал",
        grodnoAddress: "Гродненская область, г. Гродно, ул. Победы 17 - 7",
        grodnoFooterAddress: "ул. Победы 17-7, г. Гродно, Беларусь, 230026",
        inGrodnoCity: "в Гродно",

        // Mogilev
        mogilevName: "Могилёвский филиал",
        mogilevAddress: "Могилевская область, г. Могилев, ул. Челюскинцев 105В",
        mogilevFooterAddress: "ул. Челюскинцев 105В, г. Могилёв, Беларусь, 212003",
        inMogilevCity: "в Могилёве",

        // Для Navigation
        aboutBerlio: "О Берлио",
        forPartners: "Для партнеров",
        forClients: "Для клиентов",
        news: "Новости",
        equipmentAndSoftware: "Оборудование и ПО",
        contacts: "Контакты",

        // Для search
        noResult: "По вашему запросу \"{{query}}\" ничего не найдено.",
        search: "Поиск по сайту",
        ourBranchesAndContacts: "Наши филиалы и контакты",
        workingHours: "Пн - Пт: 08.30 -17.30",
        daysOff: "Сб - Вс: выходной",

        // Для partners
        appliedProgramsAndSoftware: "Прикладные программы и ПО",
        webCenterBerlio: "ПО “Веб Центр БЕРЛИО”",
        oilAndCapital: "ППП “НЕФТЬ И КАПИТАЛ”",
        selfServiceCashRegister: "Касса самообслуживания для сетей АЗС",
        gasStationAutomationSystem: "ППП “Система автоматизации АЗС”",
        invoiceWebsite: "Сайт для выставления счетов-фактур",
        usefulInformation: "Полезная информация",
        voiceInfoService: "Голосовая справочно-информационная служба",
        loyaltyProgram: "Программа лояльности",
        downloadableDocuments: "Документы для скачивания",
        berlioPaymentRules: "Правила платежной системы электронных денег «БЕРЛИО»",
        bankInformation: "Информация для банка",

        // Для clients
        electronicPaymentSystem: "Электронная платежная система",
        contractConclusion: "Заключение и перезаключение договора",
        eCardReceipt: "Получение эл.карточки",
        eCardUsage: "Использование эл.карточки",
        contractTermination: "Расторжение договора",
        ratesAndTariffs: "Прейскурант и тарифы",
        personalAccountUsage: "Работа с личным кабинетом",
        fuelCardsAndGasStations: "Топливные карты и АЗС",
        gasStationsAndRoutes: "АЗС и маршруты",
        fuelCardUsage: "Использование топливных карт",
        tollRoads: "Платные дороги (BelToll)",
        fuelPayment: "Оплата за топливо",
        regulatoryDocuments: "Нормативные документы",
        berlioEWalletRules: "Электронные деньги “БЕРЛИО” ОАО “Белгазпромбанк”. Правила",
        berlioUsageRegulations: "Регламент использования электронных денег “БЕРЛИО”",
        servicesAndSoftware: "Сервисы и ПО",
        berlioInternetClient: "Приложение “Berlio Internet client”",
        berlioCardPayApp: "Приложение “BERLIOCARDPAY”",
        tatneftApp: "Приложение “АЗС ТАТНЕФТЬ BY”",
        clientCabinetSoftware: "ПО “Личный кабинет клиента”",

        // Для MainBlock
        mainBlock: {
            companyName: "Компания НП ООО «БЕРЛИО»",
            headline: "Система электронных расчетов на АЗС",
            tagline: "используйте электронную карту «БЕРЛИО» и заправляйтесь за 3 минуты",
            fuelCardUsage: "Использование топливных карт",
            belTollServices: "позволяет оплачивать услуги в системе BelToll (оплата платных дорог)",
            nonResidentServices: "Услуги в отношении нерезидентов РБ",
            nonResidentSupport: "компания также поддерживает клиентов из ближнего зарубежья",
            readMore: "Подробнее",
        },

        // Для Footer
        telFax: "(тел / факс)",
        fax: "(факс)",
        forOrganizations: "Для организаций",
        forClientInquiries: "Для обращения клиентов",
        technicalSupport: "Техническое обслуживание",

        // Для SecodaryFooter
        rulesOfUse: "Правила использования",
        offerAgreement: "Договор оферты",
        privacy: "Конфиденциальность",
        help: "Помощь",
        copyright: "© {{year}} НП ООО «Берлио»",
    },
};

export default ru;
