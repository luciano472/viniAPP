warning: in the working copy of 'package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/environments/environment.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/main.ts', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex b622a77..d857706 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -21,6 +21,7 @@[m
         "@capacitor/keyboard": "8.0.5",[m
         "@capacitor/status-bar": "8.0.3",[m
         "@ionic/angular": "^9.0.0",[m
[32m+[m[32m        "aws-amplify": "^6.22.1",[m
         "ionicons": "^8.1.0",[m
         "rxjs": "~7.8.0",[m
         "tslib": "^2.3.0"[m
[36m@@ -760,6 +761,725 @@[m
         "node": "^22.22.2 || ^24.15.0 || >=26.0.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@aws-amplify/analytics": {[m
[32m+[m[32m      "version": "7.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/analytics/-/analytics-7.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-j4lM2A0vXbeEw67riRR3fTn5vC7p9fcv2LOuifWu8q4MsOPJE484W9qC+YQ/1FltjhD7AnGrLONi08Neb8tlEQ==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-sdk/client-firehose": "^3.1012.0",[m
[32m+[m[32m        "@aws-sdk/client-kinesis": "^3.1012.0",[m
[32m+[m[32m        "@aws-sdk/client-personalize-events": "^3.1012.0",[m
[32m+[m[32m        "@smithy/util-utf8": "2.0.0",[m
[32m+[m[32m        "tslib": "^2.5.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@aws-amplify/core": "^6.19.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/api": {[m
[32m+[m[32m      "version": "6.4.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/api/-/api-6.4.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-iRKWGQ1vHVQmPFKALgRNsjxUQ1A9A5++3Y2A5bLbWHmnBUCA1fsP1VVhuQRfN4NeY7ik3OhJc9T+1SSJfsPl3g==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-amplify/api-graphql": "4.10.1",[m
[32m+[m[32m        "@aws-amplify/api-rest": "4.7.0",[m
[32m+[m[32m        "@aws-amplify/data-schema": "^1.7.0",[m
[32m+[m[32m        "rxjs": "^7.8.1",[m
[32m+[m[32m        "tslib": "^2.5.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@aws-amplify/core": "^6.19.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/api-graphql": {[m
[32m+[m[32m      "version": "4.10.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/api-graphql/-/api-graphql-4.10.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-pMe4JroNphPotrM8B3qhCxN0RNe3WQzZpVHsLKxcXdXZN67jKrsX034kvFd7YNOKRtha4xa7hOhf7hW/11ty1Q==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-amplify/api-rest": "4.7.0",[m
[32m+[m[32m        "@aws-amplify/core": "6.19.2",[m
[32m+[m[32m        "@aws-amplify/data-schema": "^1.7.0",[m
[32m+[m[32m        "@aws-sdk/types": "^3.973.6",[m
[32m+[m[32m        "graphql": "15.8.0",[m
[32m+[m[32m        "rxjs": "^7.8.1",[m
[32m+[m[32m        "tslib": "^2.5.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/api-rest": {[m
[32m+[m[32m      "version": "4.7.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/api-rest/-/api-rest-4.7.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-TsPbZq3ZsGOxEWnRd5DS+uy74LaW3TIOC/2XKnj8+/zBlnI30pUK8fDXf4XO28PYLai8DL/pRVMKWsAletU+iw==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": "^2.5.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@aws-amplify/core": "^6.19.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/auth": {[m
[32m+[m[32m      "version": "6.21.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/auth/-/auth-6.21.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-KlukhqSFhioPxYJ0r8aHIWagvrvHR1SdPmMaEbyVHDJHZf+ndz1e+VQjDzYv7bwjb1T2dAvt24C1A5PM8JkftA==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-crypto/sha256-js": "5.2.0",[m
[32m+[m[32m        "@smithy/types": "^3.3.0",[m
[32m+[m[32m        "tslib": "^2.5.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@aws-amplify/core": "^6.19.0",[m
[32m+[m[32m        "@aws-amplify/react-native": "^1.1.10"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependenciesMeta": {[m
[32m+[m[32m        "@aws-amplify/react-native": {[m
[32m+[m[32m          "optional": true[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/core": {[m
[32m+[m[32m      "version": "6.19.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/core/-/core-6.19.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-no55Uqqi3YNFppzoHRAwxvrvOaVFJ7xDtbal9nJmaZNZxJrEWzarCqMfPb0/NORa02BzFL3fvo2zR7sq5yiCfg==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-crypto/sha256-js": "5.2.0",[m
[32m+[m[32m        "@aws-sdk/types": "^3.973.6",[m
[32m+[m[32m        "@smithy/util-hex-encoding": "2.0.0",[m
[32m+[m[32m        "@types/uuid": "^9.0.0",[m
[32m+[m[32m        "js-cookie": "^3.0.7",[m
[32m+[m[32m        "rxjs": "^7.8.1",[m
[32m+[m[32m        "tslib": "^2.5.0",[m
[32m+[m[32m        "uuid": "^11.1.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/core/node_modules/uuid": {[m
[32m+[m[32m      "version": "11.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/uuid/-/uuid-11.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-vIYxrBCC/N/K+Js3qSN88go7kIfNPssr/hHCesKCQNAjmgvYS2oqr69kIufEG+O4+PfezOH4EbIeHCfFov8ZgQ==",[m
[32m+[m[32m      "funding": [[m
[32m+[m[32m        "https://github.com/sponsors/broofa",[m
[32m+[m[32m        "https://github.com/sponsors/ctavan"[m
[32m+[m[32m      ],[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "uuid": "dist/esm/bin/uuid"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/data-schema": {[m
[32m+[m[32m      "version": "1.26.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/data-schema/-/data-schema-1.26.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-FPCpu5rYswmS5PiL5/f6teeVuOwClvKsGYiyd/MaTE0lUpKEpd3663s3Dm7U9EYgAbsmCdb8fVNX0kQzSkGm+Q==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-amplify/data-schema-types": "*",[m
[32m+[m[32m        "@smithy/util-base64": "^3.0.0",[m
[32m+[m[32m        "@types/aws-lambda": "^8.10.134",[m
[32m+[m[32m        "@types/json-schema": "^7.0.15",[m
[32m+[m[32m        "rxjs": "^7.8.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/data-schema-types": {[m
[32m+[m[32m      "version": "1.3.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/data-schema-types/-/data-schema-types-1.3.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-A9vuOwhdrRFCXIXaL48JtpJjSoAdhpI4CPFRPm7F+i4hF1nQO3+bGdiSHY6iKRrEoBoXCAcwozIjvAImhxz2sg==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "graphql": "15.8.0",[m
[32m+[m[32m        "rxjs": "^7.8.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/datastore": {[m
[32m+[m[32m      "version": "5.1.13",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/datastore/-/datastore-5.1.13.tgz",[m
[32m+[m[32m      "integrity": "sha512-A9C7lOJWaP4Xl4jZnk92eau81wZASa4XInEomK2+T9mmr0J8Qhj001jQIGU/cuh+Kb3rRpznb6cl3O0RtWwbPA==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-amplify/api": "6.4.2",[m
[32m+[m[32m        "@aws-amplify/api-graphql": "4.10.1",[m
[32m+[m[32m        "buffer": "4.9.2",[m
[32m+[m[32m        "idb": "5.0.6",[m
[32m+[m[32m        "immer": "^11.1.9",[m
[32m+[m[32m        "rxjs": "^7.8.1",[m
[32m+[m[32m        "ulid": "^2.3.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@aws-amplify/core": "^6.19.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/notifications": {[m
[32m+[m[32m      "version": "2.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/notifications/-/notifications-2.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-B+FWXdjjeQdNHKDIZqvY7KKwhh8e93m5tpdpmWV9j9ASmotUvWg8uCVecaOfEpyBL1Iqti0toMoUi0Stu86iYA==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-sdk/types": "^3.973.6",[m
[32m+[m[32m        "lodash": "^4.18.1",[m
[32m+[m[32m        "tslib": "^2.5.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@aws-amplify/core": "^6.19.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-amplify/storage": {[m
[32m+[m[32m      "version": "6.17.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-amplify/storage/-/storage-6.17.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-XHHxh3H9No0n2LbqzUhM2rQ/e/XeY3475Iubl4XxeNkp35qQhoJD6KaL/PHBgYRyrHo+8Hfbt5dBFGwCnGdF5A==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-sdk/types": "^3.973.6",[m
[32m+[m[32m        "@smithy/md5-js": "2.0.7",[m
[32m+[m[32m        "buffer": "4.9.2",[m
[32m+[m[32m        "crc-32": "1.2.2",[m
[32m+[m[32m        "fast-xml-parser": "^5.7.2",[m
[32m+[m[32m        "tslib": "^2.5.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@aws-amplify/core": "^6.19.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-crypto/sha256-js": {[m
[32m+[m[32m      "version": "5.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-crypto/sha256-js/-/sha256-js-5.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-FFQQyu7edu4ufvIZ+OadFpHHOt+eSTBaYaki44c+akjg7qZg9oOQeLlk77F6tSYqjDAFClrHJk9tMf0HdVyOvA==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-crypto/util": "^5.2.0",[m
[32m+[m[32m        "@aws-sdk/types": "^3.222.0",[m
[32m+[m[32m        "tslib": "^2.6.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=16.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-crypto/util": {[m
[32m+[m[32m      "version": "5.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-crypto/util/-/util-5.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-4RkU9EsI6ZpBve5fseQlGNUWKMa1RLPQ1dnjnQoe07ldfIzcsGb5hC5W0Dm7u423KWzawlrpbjXBrXCEv9zazQ==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-sdk/types": "^3.222.0",[m
[32m+[m[32m        "@smithy/util-utf8": "^2.0.0",[m
[32m+[m[32m        "tslib": "^2.6.2"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-sdk/client-firehose": {[m
[32m+[m[32m      "version": "3.1150.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-sdk/client-firehose/-/client-firehose-3.1150.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-LH8mNGMMEEX4pFbbshLU5NMbo6K6an+S8E+sT+awXlo7gRy0P8t3oSpsNZ0a1/CbCctP7X19uEM8IMYswHmQYg==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-sdk/core": "^3.978.3",[m
[32m+[m[32m        "@aws-sdk/credential-provider-node": "^3.972.86",[m
[32m+[m[32m        "@aws-sdk/types": "^3.974.6",[m
[32m+[m[32m        "@smithy/core": "^3.35.2",[m
[32m+[m[32m        "@smithy/fetch-http-handler": "^5.8.0",[m
[32m+[m[32m        "@smithy/node-http-handler": "^4.12.1",[m
[32m+[m[32m        "@smithy/types": "^4.19.0",[m
[32m+[m[32m        "tslib": "^2.6.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=20.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-sdk/client-firehose/node_modules/@smithy/types": {[m
[32m+[m[32m      "version": "4.19.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@smithy/types/-/types-4.19.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-r7jh49VJxGerfAcTQA6gXcKc+98zOp/tqRwzYjgOE+iSQsP6cEU1hq2QzbuipmP68QtYdY9wKEhiCQZIzHgZ4Q==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": "^2.6.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=18.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-sdk/client-kinesis": {[m
[32m+[m[32m      "version": "3.1150.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-sdk/client-kinesis/-/client-kinesis-3.1150.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-MU7HrrJekcfWtkGZ7IOjzqQa7zDFjSC1Dl9/xAht9DjEdC3YOGVAUkNtbd7R9RvoJN5z8LGgcdDTwWXoSoJl7A==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-sdk/core": "^3.978.3",[m
[32m+[m[32m        "@aws-sdk/credential-provider-node": "^3.972.86",[m
[32m+[m[32m        "@aws-sdk/types": "^3.974.6",[m
[32m+[m[32m        "@smithy/core": "^3.35.2",[m
[32m+[m[32m        "@smithy/fetch-http-handler": "^5.8.0",[m
[32m+[m[32m        "@smithy/node-http-handler": "^4.12.1",[m
[32m+[m[32m        "@smithy/types": "^4.19.0",[m
[32m+[m[32m        "tslib": "^2.6.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=20.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-sdk/client-kinesis/node_modules/@smithy/types": {[m
[32m+[m[32m      "version": "4.19.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@smithy/types/-/types-4.19.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-r7jh49VJxGerfAcTQA6gXcKc+98zOp/tqRwzYjgOE+iSQsP6cEU1hq2QzbuipmP68QtYdY9wKEhiCQZIzHgZ4Q==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": "^2.6.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=18.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@aws-sdk/client-personalize-events": {[m
[32m+[m[32m      "version": "3.1150.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@aws-sdk/client-personalize-events/-/client-personalize-events-3.1150.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-QYP2bWg2FJXr3WlsQ/E1shLBWszpOmk2RaAaNK/f20WChDCUArWbL86QOozacq/Z5AqRK8UJsm0xFTw97JxH8w==",[m
[32m+[m[32m      "license": "Apache-2.0",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@aws-sdk/core": "^3.978.3",[m
[32m+[m[32m        "@aws-sdk/credential-provider-node": "^3.972.86",[m
[32m+[m[32m        "@aws-sd