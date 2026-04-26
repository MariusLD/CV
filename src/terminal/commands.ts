import { Terminal } from "@xterm/xterm";

const bold = "\x1b[1m";
const cyan = "\x1b[36m";
const reset = "\x1b[0m";
const yellow = "\x1b[33m";
const gray = "\x1b[90m";
const dark_red = "\x1b[31m";

export function handleCommand(cmd: string, term: Terminal) {
  switch (cmd.toLowerCase()) {
    case "help":
      term.writeln("");
      term.writeln("Commandes disponibles :");
      term.writeln("");

      term.writeln("\x1b[32m[ACCESS]\x1b[0m whoami       → Informations sur l'utilisateur");
      term.writeln("\x1b[32m[ACCESS]\x1b[0m skills       → Compétences techniques");
      term.writeln("\x1b[32m[ACCESS]\x1b[0m formation    → Parcours académique");
      term.writeln("\x1b[32m[ACCESS]\x1b[0m experience   → Expériences professionnelles");
      term.writeln("\x1b[32m[ACCESS]\x1b[0m contact      → Point d'accès aux réseaux personnels");

      term.writeln("");
      break;

    case "whoami":
      term.writeln("");

      term.writeln("Ingénieur diplômé en Systèmes d'Information");
      term.writeln("Développeur Full Stack sur une application métier pour la douane française.");
      term.writeln("");

      term.writeln("Intérêt particulier pour le software engineering et le développement d'app web, attrait pour le data engineering/data analyse, aux sujets de performance, à la\r\ncybersécurité et l'IA.");
      term.writeln("");

      term.writeln("Ouvert à de nouvelles opportunités.");
      
      break;

    case "skills":
      term.writeln("");

      term.writeln(`${bold}${cyan}Langages & Frameworks${reset}`);
      term.writeln("- Java (Spring Boot), Hibernate, TypeScript (Angular), Spring Batch");
      term.writeln("- Python (IA, data analysis)");
      term.writeln("- Scala, C++, Kotlin (bases)");
      term.writeln("");

      term.writeln(`${bold}${cyan}Bases de données${reset}`);
      term.writeln("- PostgreSQL, Firebase Realtime Database");
      term.writeln("");

      term.writeln(`${bold}${cyan}Intelligence Artificielle${reset}`);
      term.writeln("- Machine Learning, Neural Networks");
      term.writeln("- NLP, Transformers");
      term.writeln("");

      term.writeln(`${bold}${cyan}DevOps${reset}`);
      term.writeln("- Docker, Kubernetes (Rancher)");
      term.writeln("- Jenkins, Maven, SonarQube, Nexus");
      term.writeln("- Git");
      term.writeln("");

      term.writeln(`${bold}${cyan}Cybersécurité${reset}`);
      term.writeln("- Honeypots (Management de VM avec Vagrant, déploiement avec Ansible)");
      term.writeln("- Supervision réseau (Suricata)");
      term.writeln("");

      term.writeln(`${bold}${cyan}Testing${reset}`);
      term.writeln("- JUnit V&V, Mockito");
      term.writeln("");

      term.writeln(`${bold}${cyan}Outils & concepts${reset}`);
      term.writeln("- Jira, Confluence");
      term.writeln("- Design Patterns, Clean Code");
      term.writeln("");

      term.writeln(`${bold}${cyan}Langues${reset}`);
      term.writeln("- Français (natif)");
      term.writeln("- Anglais (B2+/C1)");
      term.writeln("- Espagnol (B1)");

      break;

    case "formation":
      term.writeln("");

      term.writeln(`${bold}${cyan}➜  Diplôme d'Ingénieur en Systèmes d'Information${reset}`);
      term.writeln(`${gray}ESIR - École Supérieure d'Ingénieurs de Rennes | 2021 - 2024${reset}`);
      term.writeln("");

      term.writeln(`${bold}${yellow}➜  CUPGE${reset}`);
      term.writeln(`${gray}ESIR | 2019 - 2021${reset}`);

      break;

    case "experience":
      term.writeln("");

      term.writeln(`${bold}${cyan}➜  Ingénieur Full Stack - Application de formation (Douane Française)${reset}`);
      term.writeln(`${gray}Saint-Herblain, France | Septembre 2024 - Aujourd'hui${reset}`);
      term.writeln("- Développement d'une application métier destinée à la formation des agents des   douanes et la rémunération des gestionnaires de formation");
      term.writeln("- Stack : Spring Boot, Angular");
      term.writeln("- Mise en œuvre de fonctionnalités orientées sécurité, performance et fiabilité");
      term.writeln("- Déploiement sur des environnements de qualification, mise en place de batchs\r\n  de traitement de données");
      term.writeln("- Prise en charge de missions de référent technique : revue de code, mentorat de  nouveaux arrivants, suivi et attribution des tâches");
      term.writeln("");

      term.writeln(`${bold}${yellow}➜  Stage Ingénieur${reset}`);
      term.writeln(`${gray}Barcelone, Espagne | 6 mois (Mars 2024 - Septembre 2024)${reset}`);
      term.writeln("- Première phase du développement de l'application de formation douanière");
      term.writeln("");

      term.writeln(`${bold}${cyan}➜  Stage IA & Cybersécurité - CentraleSupélec${reset}`);
      term.writeln(`${gray}Rennes, France | 3 mois (Été 2023)${reset}`);
      term.writeln("- Déploiement de honeypots en environnement sécurisé, collecte et analyse de\r\n  données de trafic réseau");
      term.writeln(
        "- Contribution à des travaux de recherche en cybersécurité : " +
        "\x1b]8;;https://poneypot.inria.fr/team\x1b\\Poneypot\x1b]8;;\x1b\\"
      );

      break;

    case "contact": {
      term.writeln("");

      const linkedin = "https://www.linkedin.com/in/marius-l-9053451a0/";
      const github = "https://github.com/MariusLD";

      const formatLink = (url: string, label: string) =>
        `\x1b]8;;${url}\x1b\\${label}\x1b]8;;\x1b\\`;

      term.writeln(`${bold}Réseaux professionnels${reset}`);
      term.writeln(formatLink(linkedin, "\x1b[34mLinkedIn\x1b[0m"));
      term.writeln(formatLink(github, "\x1b[34mGitHub\x1b[0m"));

      term.writeln("");
      term.writeln(`${bold}Coordonnées personnelles${reset}`);
      term.writeln("\x1b[32mEmail\x1b[0m : " + import.meta.env.VITE_CONTACT_EMAIL);
      term.writeln("\x1b[32mTéléphone\x1b[0m : " + import.meta.env.VITE_CONTACT_PHONE);

      break;
    }

    case "clear":
      term.clear();
      break;

    default:
      term.writeln(`Commande inconnue: ${dark_red}${cmd}${reset} \x1b[90m(tapez 'help' pour la liste des commandes)\x1b[0m`);
  }
}